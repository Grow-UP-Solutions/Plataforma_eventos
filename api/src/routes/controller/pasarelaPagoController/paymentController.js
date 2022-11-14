require("dotenv").config();
const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
   access_token: `${ACCESS_TOKEN}`,
});

router.post("/orden", async (req, res) => {
   const carrito = req.body;
   const {codigoDescuento}= req.query
   
   

   const monto = carrito
      .map((e) => {
         const montoTem = e.unit_price * e.quantity;
         return montoTem;
      })
      .reduce((a, b) => a + b);

   const userDB = await Users.findOne({ email: email[0] });

   const newOrder = new Orders({
      status: EnumStatus.PENDING,
      fecha: new Date(),
      usuario: userDB._id,
      produt: carrito.map((e) => e.title),
      total: monto,
      payment_id: 0,
      status_order: Enum.CREATED,
      libros: carrito.map((e) => {
         return { title: e.title, quantity: e.quantity };
      }),
   });

   await newOrder.save();
   userDB.buyBooks = userDB.buyBooks.concat(newOrder._id);
   await userDB.save();

   try {
      const itemsMp = carrito?.map((e) => ({
         title: e.title,
         unit_price: Number(e.unit_price),
         quantity: Number(e.quantity),
      }));

      let preference = {
         items: itemsMp,
         nameUser: userDB.name,
         emailUser: userDB.email,
         external_reference: `${newOrder._id}`,
         payment_methods: {
            excluded_payment_type: [
               {
                  id: "atm",
               },
            ],
            installments: 4,
         },

         back_urls: {
            success: "https://e-commerce-books.vercel.app/mercadopago/success",
            failure: "https://e-commerce-books.vercel.app/mercadopago/success",
            pending: "https://e-commerce-books.vercel.app/mercadopago/success",
         },
         auto_return: "approved",
      };
      const saveOrder = await Orders.findById({ _id: newOrder._id }).populate({
         path: "usuario",
      });

      const respuesta = await mercadopago.preferences.create(preference);

      const globalInitPoint = respuesta.body.init_point;
      return res.json({ init_point: globalInitPoint, order: saveOrder });
   } catch (error) {
      return console.log("FALLO MERCADO PAGO", error);
   }
});
