const Events = require("../../../models/db/Events");



async function paymentEvents(idEvent, idDate, codigoDescuento) {
   try {
      const event = await Events.findOne({ _id : idEvent});
   
      const eventDate = event.dates.find((e) => e._id == idDate);
      //if(parseInt(eventDate.cupos) === 0) throw new Error("No hay cupos disponibles")
      
      if (codigoDescuento) {
         
         const montoDeDescuento = eventDate.codigos.find(
            (e) => e.codigo === codigoDescuento
         );

         if (!montoDeDescuento || montoDeDescuento.cantidad === 0) {
            throw new Error("Este codigo no es valido");
         }

         let descuento = (parseInt(eventDate.price) * parseInt(montoDeDescuento.descuento)) / 100;

         montoDeDescuento.cantidad -= 1;
         montoDeDescuento.uses += 1;
         //parseInt(eventDate.cupos) -= 1
         eventDate.price - descuento
         await event.save()
         return eventDate ;
      }

      //eventDate.cupos -= 1
      
      await event.save()
      return eventDate
   } catch (error) {
      throw new Error(error.message);
   }
}

module.exports = paymentEvents
