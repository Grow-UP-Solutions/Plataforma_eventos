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
   const { codigo } = dates;

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
               "https://plataformaeventos-production.up.railway.app/mercadoPago/success",
            failure:
               "https://plataformaeventos-production.up.railway.app/mercadoPago/fail",
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
   const { external_reference, payment_id, preference_id } = req.query;
   const ids = external_reference.split(",");
   const idEvent = ids[0];

   const idUser = ids[1];

   try {
      const dataPayments = await axios(
         `https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`
      );

      const response = dataPayments.data;

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

      res.json({ response });
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
