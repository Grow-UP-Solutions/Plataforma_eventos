import  Events  from "../../db/Events.js";



   export async function getAllEventsDb(){
        return await Events.find()
        .populate({ path: "organizer" })
        .populate({ path: "category" })
        .populate({ path: "opinions" });
    }
