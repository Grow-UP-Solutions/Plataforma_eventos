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

router.post("/pago", async (req, res) => {
   const carrito = req.body;

   const userDB = await UsersFunctionDb.oneUser(carrito.idUser);

   const eventDB = await EventFunctionDb.oneEvent(carrito.idEvent);

   const date = eventDB.dates.find((e) => e._id == carrito.idDate);

   const telefono = userDB.tel.split(" ").join("");

   if (date.cupos <= 0) {
      throw new Error("El evento esta sobrevendido");
   }
   try {
      const itemsMp = carrito;

      let preference = {
         items: [itemsMp],
         nameUser: userDB.name,
         emailUser: userDB.email,
         identification: {
            number: userDB.document,
            type: "CC",
         },
         external_reference: `${carrito.idEvent},${carrito.idDate},${carrito.idUser}`,
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
            success: "http://localhost:3001/pago/success",
            failure: "http://localhost:3001/pago/fail",
            pending: "http://localhost:3001/pago/pending",
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
      res.status(500).json(error.message);
   }
});

router.get("/success", async (req, res) => {
   const { external_reference, payment_id, preference_id } = req.query;
   const ids = external_reference.split(",");
   const idEvent = ids[0];
   const idDate = ids[1];
   const idUser = ids[2];

   try {
      const dataPayments = await axios(
         `https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`
      );

      const response = dataPayments.data;

      const event = await EventFunctionDb.oneEvent(idEvent);

      const date = event.dates.find((e) => e._id == idDate);

      const user = await UsersFunctionDb.oneUser(idUser);

      if (
         response.status === "approved" &&
         response.status_detail === "accredited"
      ) {
         console.log("estoy aqui");
         event.generalBuyers.push(user._id);

         date?.buyers.push(user._id);

         date.cupos -= 1;

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

router.get("/pending", async (req, res) => {
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
