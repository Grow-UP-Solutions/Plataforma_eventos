require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const CodeDiscount = require('../../../models/DB/CodeDiscount');
const Order = require('../../../models/db/Order');
const SuccessPayment = require('../../../models/DB/SuccessPayment');
const calculoDeComicion = require('../../../models/util/calculoDeComiciones/calculoDeComicion');
const { getCodeDiscountByCode } = require('../../../models/util/functionDB/CodeDiscountDb');
const EventFunctionDb = require('../../../models/util/functionDB/event/index.event');
const UsersFunctionDb = require('../../../models/util/functionDB/users/index.users');
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

let auxBody = [];
let idCompra = 0;
router.post('/orden', async (req, res) => {
  const { dates, idUser, idEvent, ganancia } = req.body;

  auxBody.push({ dates, idUser, idEvent, ganancia });

  const codigosPrueba = dates.map((e) => e.codigo);

  const userDB = await UsersFunctionDb.oneUser(idUser);
  const eventDB = await EventFunctionDb.oneEvent(idEvent);

  const dateEvent = [];

  for (let i = 0; i < dates.length; ++i) {
    for (let j = 0; j < eventDB.dates.length; j++) {
      if (dates[i].id == eventDB.dates[j]._id) dateEvent.push(eventDB.dates[j]);
    }
  }

  const telefono = userDB.tel?.split(' ').join('');

  let isCuposLlenos = false;

  dateEvent.forEach((date) => {
    if (date.cupos <= 0) isCuposLlenos = true;
  });

  if (isCuposLlenos) {
    throw new Error('El evento esta sobrevendido');
  }
  try {
    const itemsMp = dates;

    let preference = {
      items: itemsMp,
      nameUser: userDB.name,
      emailUser: userDB.email,
      binary_mode: true,
      identification: {
        number: userDB.document,
        type: 'CC',
      },
      external_reference: `${idEvent},${idUser}`,
      payer: {
        name: userDB.firstName,
        surname: userDB.lastName,
        email: userDB.email,
        date_created: Date.now(),
        phone: {
          area_code: '57',
          number: parseInt(telefono),
        },
      },
      payment_methods: {
        excluded_payment_type: [
          {
            id: 'atm',
          },
        ],
        installments: 4,
      },

      back_urls: {
        success: `http://localhost:3000/mercadoPago/success`,
        failure: `http://localhost:3000/mercadoPago/fail`,
      },
      auto_return: 'approved',
      taxes: [
        {
          type: 'IVA',
          value: 19,
        },
      ],
    };

    /* API: https://events-jean.vercel.app
      LOCAL: http://localhost:3000
    */

    const respuesta = await mercadopago.preferences.create(preference);

    const globalInitPoint = respuesta.body.init_point;

    return res.json({ init_point: globalInitPoint });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

/* FECHA ACTUAL */
const fecha = new Date();
const fechaActual = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

router.get('/success', async (req, res) => {
  const { external_reference, payment_id, preference_id, codigo } = req.query;

  const ids = external_reference.split(',');

  const idEvent = ids[0];
  const idUser = ids[1];

  let resultTransaccion = {};
  let factura = {};

  try {
    const dataPayments = await axios(
      `https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`
    );

    const response = dataPayments.data;

    /* const cuposComprados = response.additional_info.items.map((e) => parseInt(e.quantity));
    const totalDeCupos = cuposComprados.reduce((a, b) => a + b); */

    let totalCupos = 0;
    auxBody[0].dates.forEach((date) => {
      totalCupos = totalCupos + date.quantity;
    });

    const event = await EventFunctionDb.oneEvent(idEvent);
    const organizerEvent = await UsersFunctionDb.oneUser(event.organizer);
    const user = await UsersFunctionDb.oneUser(idUser);

    let ganancia = 0;

    if (response.status === 'approved' && response.status_detail === 'accredited') {
      organizerEvent.pendingEarnings += auxBody[0].ganancia;
      organizerEvent.overallEarnings += auxBody[0].ganancia;
      event.pendingEarnings += auxBody[0].ganancia;
      event.overallEarnings += auxBody[0].ganancia;
      event.sells += totalCupos;

      let usuariosComprados = [];

      const buyer = {
        buyer: user._id,
        buyerEmail: user.email,
        pictureBuyer: user.userpicture,
        eventId: event._id,
        eventTitle: event.title,
        dates: [],
      };

      event.dates.forEach(async (e, i) => {
        for (let j = 0; j < auxBody[0].dates.length; ++j) {
          if (e._id == auxBody[0].dates[j].id) {
            const date = {
              dateId: auxBody[0].dates[j].id,
              dateFromated: e.dateFormated,
              date: e.date,
              start: e.start,
              end: e.end,
              quantity: auxBody[0].dates[j].quantity,
            };

            buyer.dates.push(date);

            const auxUsuariosComprados = {
              idDate: auxBody[0].dates[j].id,
              idEvent: auxBody[0].idEvent,
              cantidad: auxBody[0].dates[j].quantity,
              codigo: auxBody[0].dates[j].codigoUsuario || auxBody[0].dates[j].codigoDescuento || null,
              date: '',
              dateFormated: '',
              start: '',
              end: '',
            };

            if (e._id.toString() === auxBody[0].dates[j].id) {
              auxUsuariosComprados.date = e.date;
              auxUsuariosComprados.dateFormated = e.dateFormated;
              auxUsuariosComprados.start = e.start;
              auxUsuariosComprados.end = e.end;
            }

            usuariosComprados.push(auxUsuariosComprados);

            for (let x = 0; x < e.codigos.length; x++) {
              if (
                auxBody[0].dates[j].codigoDescuento !== null &&
                e.codigos[x].codigo === auxBody[0].dates[j].codigoDescuento
              ) {
               
                if( e.codigos[x].cantidad > auxBody[0].dates[j].quantity ){

                  e.codigos[x].cantidad = e.codigos[x].cantidad - auxBody[0].dates[j].quantity;
                  e.codigos[x].uses = e.codigos[x].uses + auxBody[0].dates[j].quantity;

                } else if( e.codigos[x].cantidad <= auxBody[0].dates[j].quantity ){

                  e.codigos[x].uses = e.codigos[x].cantidad,
                  e.codigos[x].cantidad = 0;
                 

                }
             
              } else if (auxBody[0].dates[j].codigoUsuario !== null) {
                const codigo = await CodeDiscount.findOne({ code: auxBody[0].dates[j].codigoUsuario });

                codigo.isRedimeed = true;
                codigo.userRedimeed = user.nickname;
                codigo.dateRedimeed = fechaActual;

                codigo.save();
              }
            }

            e.buyers.push({
              id: user._id,
              email: user.email,
              cupos: auxBody[0].dates[j].quantity,
              codigo: auxBody[0].dates[j].codigoUsuario || auxBody[0].dates[j].codigoDescuento || null,
            });

            e.cupos = e.cupos - auxBody[0].dates[j].quantity;
            e.sells = e.sells + auxBody[0].dates[j].quantity;
            e.pendingEarnings = e.pendingEarnings + auxBody[0].dates[j].ganancias;
            e.overallEarnings = e.overallEarnings + auxBody[0].dates[j].ganancias;
          }
        }
      });

      event.generalBuyers.push(buyer);

      user.myEventsBooked.push(event._id);

      if (user.isReferral.code && !user.isReferral.use) {
        const userReferral = await UsersFunctionDb.codeUser(user.isReferral.code);

        let referredAux = [...userReferral.referrals];

        referredAux = referredAux.map((referred) => {
          if (referred.id.toString() === user._id.toString()) {
            referred.pending = 0;
            referred.total = 5000;
          }
          return referred;
        });

        userReferral.referrals = [];
        userReferral.referrals.push(...referredAux);
        userReferral.availableCredit += 5000;
        userReferral.save();
        user.isReferral.use = true;
      }

      await event.save();

      resultTransaccion = {
        thumbnail: event.pictures[0].picture,
        motivo: event.title,
        codigoDeLaTransaccion: payment_id,
        DestinoDePago: response.statement_descriptor,
        fechaDePago: response.date_created,
        valorDeLaTransaccion: response.net_amount,
        costoDeLaTransaccion: response.net_amount,
        referencia: response.payer.identification.number,
        estatus: response.status,
        organizador: event.organizer.name,
        oganizadorId: event.organizer._id,
        oganizadorRentas: event.organizer.isDeclarant,
        cuposComprados: usuariosComprados,
      };

      factura = {
        evento: event.title,
        fechaDeFacturacion: response.date_created,
        numeroDeFactura: payment_id,
        ganancia: ganancia,
        isPay: false,
      };

      organizerEvent.factura.push(factura);
      user.ordenes.push(resultTransaccion);

      // obtener la hora en la configuración regional de EE. UU.
      const today = new Date();
      const timeNow = today.toLocaleTimeString('en-US');

      idCompra++;

      const newOrder = new Order({
        idCompra: 'C' + idCompra,
        idEvent: event.idEvent,
        idOrganizer: organizerEvent.idOrganizer,
        organizerName: organizerEvent.firstName,
        organizerLastName: organizerEvent.lastName,
        organizerisDeclarant: organizerEvent.isDeclarant,
        idBuyer: user.idUser,
        buyerDni: user.document,
        buyerCity: user.city,
        buyerAddress: user.direction,
        buyerPhone: user.phone,
        buyerName: user.firstName,
        buyerLastName: user.lastName,
        eventName: event.title,
        eventDate: usuariosComprados,
        dateBuy: fechaActual,
        timeBuy: timeNow,
        adminEarns: response.net_amount,
        comision: response.net_amount * 0.16,
        iva: response.net_amount * 0.19,
        organizerEarns: auxBody[0].ganancia,
      });

      await newOrder.save();
      await organizerEvent.save();
      await user.save();
      usuariosComprados = [];
      auxBody = [];

      return res.json(resultTransaccion);
    }

    resultTransaccion = {
      Motivo: event.title,
      codigoDeLaTransaccion: payment_id,
      DestinoDePago: response.statement_descriptor,
      fechaDePago: response.date_created,
      valorDeLaTransaccion: response.net_amount,
      costoDeLaTransaccion: response.net_amount,
      referencia: response.payer.identification.number,
      estatus: response.status,
    };

    return res.json(resultTransaccion);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

router.put('/adminPaymentOrganizer/', async (req, res) => {
  const { billNumber, datePay, ganancia, idDate, idEvent, idOrg } = req.body;

  try {
    const organizer = await UsersFunctionDb.oneUser(idOrg);
    const event = await EventFunctionDb.oneEvent(idEvent);

    if (!organizer) throw new Error('Usuario no existe');
    if (!event) throw new Error('Evento no existe');

    /* EVENT */

    event.pendingEarnings = event.pendingEarnings - ganancia;
    event.payedEarnings = event.payedEarnings + ganancia;

    for (let x = 0; x < event.dates.length; x++) {
      if (event.dates[x]._id == idDate) {
        event.dates[x].pendingEarnings = event.dates[x].pendingEarnings - ganancia;
        event.dates[x].payedEarnings = event.dates[x].payedEarnings + ganancia;
        event.dates[x].datePay = datePay;
        event.dates[x].billNumber = billNumber;
        event.dates[x].isPay = true;
        await event.save();
      }
    }

    /* ORGANIZER */
    organizer.pendingEarnings = organizer.pendingEarnings - Number(ganancia);
    organizer.payedEarnings = organizer.payedEarnings + Number(ganancia);

    await event.save();
    await organizer.save();

    res.json({ message: 'Pagado exitosamente' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;

// https://api.mercadopago.com/checkout/preferences/220603994-5eb74901-5a8b-443d-a3c1-9cfc3c24fd5d?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json

/**https://api.mercadopago.com/merchant_orders/6506950463?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json */

// const dataPreference = await axios(
//    `https://api.mercadopago.com/checkout/preferences/${preference_id}?access_token=${ACCESS_TOKEN}`
// );
