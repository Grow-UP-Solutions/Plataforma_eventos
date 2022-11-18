require("dotenv").config();
const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const UsersFunctionDb = require("../../../models/util/functionDB/users/index.users");
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
   access_token: `${ACCESS_TOKEN}`,
});

router.post("/pago", async (req, res) => {
   const carrito = req.body;
   const { codigoDescuento } = req.query;

   // const monto = carrito?.map((e) => {
   //       const montoTem = e.unit_price * e.quantity;
   //       return montoTem;
   //    })
   //    .reduce((a, b) => a + b);

   const userDB = await UsersFunctionDb.oneUser(carrito.idUser);
   const telefono = userDB.tel.split(" ").join("");
   console.log(parseInt(telefono));
   console.log("Carrito", carrito);
   //console.log("USERS", userDB);

   // const newOrder = new Orders({
   //    status: EnumStatus.PENDING,
   //    fecha: new Date(),
   //    usuario: userDB._id,
   //    produt: carrito.map((e) => e.title),
   //    total: monto,
   //    payment_id: 0,
   //    status_order: Enum.CREATED,
   //    libros: carrito.map((e) => {
   //       return { title: e.title, quantity: e.quantity };
   //    }),
   // });

   //await newOrder.save();
   // userDB.buyBooks = userDB.buyBooks.concat(newOrder._id);
   // await userDB.save();

   try {
      const itemsMp = carrito;

      let preference = {
         items: [itemsMp],
         nameUser: userDB.name,
         emailUser: userDB.email,
         external_reference: `${userDB._id}`,
         payer: {
            name: userDB.name,
            surname: "user-surname",
            email: userDB.email,
            date_created: Date.now,
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

router.get('/success', async (req, res) => {
   const algo = req.query
   try {
    console.log('/*/*/*//*/',algo)
     res.json(algo)
     
   } catch (error) {
     return res.json({ msg: 'FALLO SUCCESS ', error: error })
   }
 })

 router.get('/fail', async (req, res) => {
   const algo = req.query
   try {
    console.log('/*/*/*//*/',algo)
     res.json(algo)
     
   } catch (error) {
     return res.json({ msg: 'FALLO SUCCESS ', error: error })
   }
 })

 router.get('/pending', async (req, res) => {
   const algo = req.query
   try {
    console.log('/*/*/*//*/',algo)
     res.json(algo)
     
   } catch (error) {
     return res.json({ msg: 'FALLO SUCCESS ', error: error })
   }
 })

module.exports = router;
