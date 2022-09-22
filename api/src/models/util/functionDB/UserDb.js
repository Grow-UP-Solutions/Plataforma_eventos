
import "../../../DB.js"
import Users from "../../db/Users.js";


/** funciones para operaciones en base de datos usuario */

export async function getAllUserDb () {
    return await Users.find()
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" });
  }
  export async function getOneUserDb (parms) {
   
    return await Users.findOne({ email: parms })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" })|| await Users.findOne({ name: parms })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" }) ;
  }


  export async function updateOneUserDb(id, newUser) {
    return await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" });
  }
  export async function deleteOneUserDb(id) {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" });
  }

