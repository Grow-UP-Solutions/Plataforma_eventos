import "../../../DB.js";
import Users from "../../db/Users.js";

/** basic user database operations */

export async function allUserDb() {
  return await Users.find()
    .populate({ path: "myEventsCreated" })
    .populate({ path: "myFavourites" })
    .populate({ path: "myEventsBooked" })
    .populate({ path: "myOpinions" })
    .populate({ path: "opinionsOrg" });
}
export async function OneUserDb(parms) {
  try {
    return (
      (await Users.findOne({ email: parms })
        .populate({ path: "myEventsCreated" })
        .populate({ path: "myFavourites" })
        .populate({ path: "myEventsBooked" })
        .populate({ path: "myOpinions" })
        .populate({ path: "opinionsOrg" })) ||
      (await Users.findOne({ name: parms })
        .populate({ path: "myEventsCreated" })
        .populate({ path: "myFavourites" })
        .populate({ path: "myEventsBooked" })
        .populate({ path: "myOpinions" })
        .populate({ path: "opinionsOrg" }))
    );
  } catch (error) {
    return { FALLO_OPERACION_ONE_DB: error };
  }
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
/**Creating user in Database */

export async function createOneUserDb(user) {
  try {    
    const userCreated = new Users(user);
    await userCreated.save();
    return userCreated;
  } catch (error) {
    return {FALLO_CREATEUSER_DB:error}
  }
}
