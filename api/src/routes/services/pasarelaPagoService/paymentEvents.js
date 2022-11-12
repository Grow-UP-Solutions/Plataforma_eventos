const Events = require("../../../models/db/Events");

const payu = require('payu-latam-node')

const payuConfig = payu({
   apiKey: '8q8hwj36k6436hWAINJ5k3vS94',
   apiLogin: '5XSkH8WGwh7OA81'
})


async function paymentEvents(idEvent, idDate, codigoDescuento) {
   try {
      const event = await Events.findOne({ _id : idEvent});
      const eventDate = event.dates.find((e) => e._id == idDate);
      let total = parseInt(eventDate.price)
      //if(parseInt(eventDate.cupos) === 0) throw new Error("No hay cupos disponibles")
      
      if (codigoDescuento) {
         
         const montoDeDescuento = eventDate.codigos.find(
            (e) => e.codigo === codigoDescuento
         );

         if (!montoDeDescuento || montoDeDescuento.cantidad === 0) {
            throw new Error("Este codigo no es valido");
         }

         let descuento = (parseInt(eventDate.price) * parseInt(montoDeDescuento.descuento)) / 100;

         
          total = eventDate.price - descuento
         return {total : total } ;
      }

      
      
      
      return {total : total } 
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = paymentEvents
