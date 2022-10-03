import "../../../DB.js";
import Users from "../../db/Users.js";
import bcrypt from "bcryptjs";

/** basic user database operations */

export async function allUserDb() {
  try {
    const id = "633642857b1fdf0b1331ca48";
    const prueba = await Users.find();
    const prueba2 = prueba
      .map((e) => {
        return e.opinionsOrg;
      })
      .flat()
      .filter((e) => {
        return e._id == id;
      });

    return await Users.find()
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" });
  } catch (error) {
    console.log(error);
  }
}
export async function validateEmailUserDb(email) {
  try {
    return await Users.findOne({ email: email });
  } catch (error) {
    throw new Error("Ha fallado validate email user db");
  }
}
export async function oneUserDb(id) {
  try {
    console.log("DB id",id)
    return await Users.findById( id )
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "opinionsOrg" });
  } catch (error) {
    throw new Error("Ha fallado validate id user db", error);
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
  try {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" });
  } catch (error) {
    throw new Error("Error en delete user DB", error);
  }
}
/**Creating user in Database */

export async function createOneUserDb(user) {
  try {
    const userCreated = new Users(user);
    const salt = bcrypt.genSaltSync();

    userCreated.password = bcrypt.hashSync(user.password, salt);
    await userCreated.save();
    return userCreated;
  } catch (error) {
    throw new Error("Fallo create user DB", error);
  }
}

/**crear comentario usuario */

export async function generateUserComment(id, opinion) {
  try {
    const { idUser } = opinion;
    console.log(id);
    const user = await oneUserDb(idUser);
    const organizer = await oneUserDb(id);
    opinion.user = user._id;
    organizer.opinionsOrg.push(opinion);
    return await organizer.save();
  } catch (error) {
    throw new Error("Fallo comment Db", error);
  }
}
