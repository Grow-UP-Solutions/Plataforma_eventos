require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const SuccessPayment = require('../../../models/DB/SuccessPayment');
const calculoDeComicion = require('../../../models/util/calculoDeComiciones/calculoDeComicion');
const EventFunctionDb = require('../../../models/util/functionDB/event/index.event');
const UsersFunctionDb = require('../../../models/util/functionDB/users/index.users');
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

let auxBody = [];

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

  const isCuposLlenos = false;

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

    const respuesta = await mercadopago.preferences.create(preference);

    const globalInitPoint = respuesta.body.init_point;

    return res.json({ init_point: globalInitPoint });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.get('/success', async (req, res) => {
  const { external_reference, payment_id, preference_id, codigo } = req.query;

  console.log({ auxBody });

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

    console.log({ totalCupos });

    const event = await EventFunctionDb.oneEvent(idEvent);
    const organizerEvent = await UsersFunctionDb.oneUser(event.organizer);
    const user = await UsersFunctionDb.oneUser(idUser);

    let ganancia = 0;

    if (response.status === 'approved' && response.status_detail === 'accredited') {
      event.generalBuyers.push(user._id);

      organizerEvent.pendingEarnings += auxBody[0].ganancia;
      event.pendingEarnings += auxBody[0].ganancia;
      event.overallEarnings += auxBody[0].ganancia;
      event.sells += totalCupos;

      console.log({ overallEarnings: event.overallEarnings });
      console.log({ sells: event.sells });

      event.dates.forEach((e, i) => {
        for (let j = 0; j < auxBody[0].dates.length; ++j) {
          if (e._id == auxBody[0].dates[j].id) {
            for (let x = 0; x < e.codigos.length; x++) {
              if (e.codigos[x].codigo === auxBody[0].dates[j].codigo) {
                e.codigos[x].cantidad = e.codigos[x].cantidad - 1;
                e.codigos[x].uses = e.codigos[x].uses + 1;
              }
            }

            e.buyers?.push(user._id);
            e.cupos = e.cupos - auxBody[0].dates[j].quantity;
            e.sells = e.sells + auxBody[0].dates[j].quantity;
            e.pendingEarnings = e.pendingEarnings + auxBody[0].dates[j].ganancias;
            e.overallEarnings = e.overallEarnings + auxBody[0].dates[j].ganancias;
          }
        }
      });

      user.myEventsBooked.push(event._id);

      if (user.isReferral.code && !user.isReferral.use) {
        const userReferral = await UsersFunctionDb.codeUser(user.isReferral);
        userReferral.saldoPendiente -= 5000;

        userReferral.saldoTotal += 5000;

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
      await organizerEvent.save();
      await user.save();

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

router.put('/adminPaymentOrganizer/', async (req, res) => {});

module.exports = router;

// https://api.mercadopago.com/checkout/preferences/220603994-5eb74901-5a8b-443d-a3c1-9cfc3c24fd5d?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json

/**https://api.mercadopago.com/merchant_orders/6506950463?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json */

// const dataPreference = await axios(
//    `https://api.mercadopago.com/checkout/preferences/${preference_id}?access_token=${ACCESS_TOKEN}`
// );
