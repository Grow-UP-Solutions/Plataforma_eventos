require("../../../DB.js");
const Users = require("../../db/Users.js");
const bcrypt = require("bcryptjs");

/** basic user database operations */

async function allUserDb() {
  try {
    return await Users.find()
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function validateEmailUserDb(email) {
  try {
    return await Users.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function oneUserDb(id) {
  const idOrganizer = id;
  if (!idOrganizer) {
    return { msg: "Se rerquiere el id del organizador" };
  }
  try {
    return await Users.findById({ _id: idOrganizer })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "opinionsOrg" });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateOneUserDb(id, newUser) {
  try {
    return await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" })
      .populate({ path: "myOpinions" })
      .populate({ path: "opinionsOrg" });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteOneUserDb(id) {
  try {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: "myEventsCreated" })
      .populate({ path: "myFavourites" })
      .populate({ path: "myEventsBooked" });
  } catch (error) {
    throw new Error(error.message);
  }
}
/**Creating user in Database */

async function createOneUserDb(user) {
  try {
    const userCreated = new Users(user);
    const salt = bcrypt.genSaltSync();

    userCreated.password = bcrypt.hashSync(user.password, salt);

    await userCreated.save();
    return userCreated;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**crear comentario usuario */

async function generateUserComment(id, opinion) {
  try {
    const { idUser } = opinion;

    const user = await oneUserDb(idUser);

    const organizer = await oneUserDb(id);

    opinion.user = user._id;

    organizer.opinionsOrg.push(opinion);
    await organizer.save()
    return organizer.opinionsOrg[organizer.opinionsOrg.length - 1] ;
  } catch (error) {
    throw new Error(error.message);
  }
}
/** enviar mensaje desde la plataforma */
async function sendMessageDB(idSend, idGet, msg) {
  try {
    const userSend = await oneUserDb(idSend);
    const { picture, name } = userSend;
    const userGet = await oneUserDb(idGet);
    userGet.message.push({
      msg,
      user: {
        name,
        picture,
      },
    });
    await userGet.save();
    console.log(userGet.message);
    return { Respon: "mensaje enviado con exito" };
  } catch (error) {
    throw new Error(error.message);
  }
}
/**enviar notificaciones  */
async function sendNotificationUser(id, notifications) {
  const user = await Users.findOne({ _id: id });
}

module.exports = {
  allUserDb,
  createOneUserDb,
  deleteOneUserDb,
  generateUserComment,
  sendMessageDB,
  validateEmailUserDb,
  oneUserDb,
  updateOneUserDb,
};
