require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const EventFunctionDb = require("../../../models/util/functionDB/event/index.event");
const UsersFunctionDb = require("../../../models/util/functionDB/users/index.users");
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
   access_token: `${ACCESS_TOKEN}`,
});

router.post("/orden", async (req, res) => {
   const { dates, idUser, idEvent } = req.body;
   
   const codigosPrueba = dates.map(e => e.codigo)
   console.log(codigosPrueba)
   const userDB = await UsersFunctionDb.oneUser(idUser);

   const eventDB = await EventFunctionDb.oneEvent(idEvent);

   const dateEvent = eventDB.dates.find((e, i) => e._id == dates[i].id);

   const telefono = userDB.tel.split(" ").join("");

   if (dateEvent.cupos <= 0) {
      throw new Error("El evento esta sobrevendido");
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
            type: "CC",
         },
         external_reference: `${idEvent},${idUser}`,
         payer: {
            name: userDB.firstName,
            surname: userDB.lastName,
            email: userDB.email,
            date_created: Date.now(),
            phone: {
               area_code: "57",
               number: parseInt(telefono),
            },
         },
         payment_methods: {
            excluded_payment_type: [
               {
                  id: "atm",
               },
            ],
            installments: 4,
         },

         back_urls: {
            success:
               `https://plataformaeventos-production-e0ed.up.railway.app/mercadoPago/success?codigo=${codigosPrueba}`,
            failure:
               "https://plataformaeventos-production-e0ed.up.railway.app/mercadoPago/fail",
         },
         auto_return: "approved",
         taxes: [
            {
               type: "IVA",
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

router.get("/success", async (req, res) => {
   const { external_reference, payment_id, preference_id, codigo } = req.query;
   const ids = external_reference.split(",");
   console.log('QUERY',req.query)
   const idEvent = ids[0];
   
   const idUser = ids[1];
   
   try {
      const dataPayments = await axios(
         `https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`
         );
         
         const response = dataPayments.data;
         console.log('RESPONSE',response)

      const cuposComprados = response.additional_info.items.map((e) =>
         parseInt(e.quantity)
      );
      const totalDeCupos = cuposComprados.reduce((a, b) => a + b);

      const event = await EventFunctionDb.oneEvent(idEvent);

      const user = await UsersFunctionDb.oneUser(idUser);

      if (
         response.status === "approved" &&
         response.status_detail === "accredited"
      ) {
         event.generalBuyers.push(user._id);

         event.overallEarnings +=
            response.transaction_details.total_paid_amount;

         event.sells += totalDeCupos;

         event.dates.forEach((e, i) => {
            if (e._id == response.additional_info.items[i].id) {
               e.buyers?.push(user._id);

               e.sells += totalDeCupos;

               e.cupos -= totalDeCupos;

               e.profits += response.transaction_details.total_paid_amount;
            }
         });

         // const eventoesis= user.myEventsBooked.find(e=>{
         //    //console.log(e._id)
         //    return e.title === event.title
         // })
         //console.log(user.myEventsBooked.includes(event.title))
         user.myEventsBooked.push(event._id);

         if (user.isReferral.code && !user.isReferral.use) {
            const userReferral = await UsersFunctionDb.codeUser(
               user.isReferral
            );
            userReferral.saldoPendiente -= 5000;

            userReferral.saldoTotal += 5000;

            user.isReferral.use = true;
         }

         await event.save();
         await user.save();
      }

      const resultTransaccion = {
         codigoDeLaTransaccion : payment_id,
         DestinoDePago:response.statement_descriptor,
         fechaDePago: response.date_created,
         valorDeLaTransaccion: response.net_amount,
         costoDeLaTransaccion: response.net_amount,
          referencia: response.payer.identification.number

      }

      res.json(resultTransaccion);
   } catch (error) {
      console.log(error.message);
      return res.status(500).json(error.message);
   }
});

router.get("/fail", async (req, res) => {
   const algo = req.query;
   try {
      console.log("/*/*/*//*/", algo);
      res.json(algo);
   } catch (error) {
      return res.status(500).json(error.message);
   }
});

module.exports = router;

// https://api.mercadopago.com/checkout/preferences/220603994-5eb74901-5a8b-443d-a3c1-9cfc3c24fd5d?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json

/**https://api.mercadopago.com/merchant_orders/6506950463?access_token=TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994#json */

// const dataPreference = await axios(
//    `https://api.mercadopago.com/checkout/preferences/${preference_id}?access_token=${ACCESS_TOKEN}`
// );



const algo={
   "id": 9999999999,
   "status": "closed",
   "external_reference": "default",
   "preference_id": "Preference identification",
   "payments": [
     {
       "id": 9999999999,
       "transaction_amount": 1,
       "total_paid_amount": 1,
       "shipping_cost": 0,
       "currency_id": "BRL",
       "status": "approved",
       "status_detail": "accredited",
       "date_approved": "2019-04-02T18:35:35.000Z",
       "date_created": "2019-04-02T18:35:34.000Z",
       "last_modified": "2019-04-02T18:35:35.000Z",
       "amount_refunded": 0
     }
   ],
   "shipments": [
     {
       "id": 99999999999,
       "shipment_type": "shipping",
       "shipping_mode": "me2",
       "status": "delivered",
       "items": [
         {
           "id": "not specified",
           "description": "shipment item description",
           "quantity": 1,
           "dimensions": "1.0x10.0x23.0100.0"
         }
       ],
       "date_created": "2019-04-02T18:20:46.000Z",
       "last_modified": "2019-04-12T19:36:48.000Z",
       "date_first_printed": "2019-04-02T18:35:40.000Z",
       "service_id": 999,
       "sender_id": 999999999,
       "receiver_id": 999999999,
       "receiver_address": {
         "id": 9999999999,
         "address_line": "address line",
         "city": {
           "name": "City Name"
         },
         "state": {
           "id": "AR-X",
           "name": "state name"
         },
         "country": {
           "id": "AR",
           "name": "Argentina"
         },
         "latitude": 0,
         "longitude": 0,
         "comment": "shipment comment",
         "contact": "shipment contact",
         "phone": 9999999999,
         "zip_code": 9999,
         "street_name": "Nombre de la calle",
         "street_number": 999
       },
       "shipping_option": {
         "id": 999999999,
         "cost": 0,
         "currency_id": "BRL",
         "shipping_method_id": 99999,
         "estimated_delivery": {
           "date": "2019-04-11T03:00:00.000Z"
         },
         "name": "Normal a domicilio",
         "list_cost": 0,
         "speed": {
           "handling": 72,
           "shipping": 72
         }
       }
     }
   ],
   "payouts": {},
   "collector": {
     "id": 999999999,
     "email": "vendedor+329653108@adf12.com.br",
     "nickname": "TESTRPEHE21Q"
   },
   "marketplace": "NONE",
   "date_created": "2018-09-14T17:11:31.000Z",
   "last_updated": "2018-09-14T17:11:43.000Z",
   "shipping_cost": 0,
   "total_amount": 5,
   "site_id": "mla",
   "paid_amount": 5,
   "refunded_amount": 0,
   "payer": {
     "id": 999999999
   },
   "items": [
     {
       "id": "item id",
       "category_id": "item category",
       "currency_id": "BRL",
       "description": "item description",
       "picture_url": "item picture url",
       "title": "item title",
       "quantity": 1,
       "unit_price": 5
     }
   ],
   "cancelled": false,
   "additional_info": "additional information",
   "application_id": 10000000000000000,
   "order_status": "paid"
 }
