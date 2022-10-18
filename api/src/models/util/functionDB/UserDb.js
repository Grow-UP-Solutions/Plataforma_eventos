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

async function generateUserComment(id, opinions) {
  try {
    const { idUser, opinion } = opinions;

    const user = await oneUserDb(idUser);

    const organizer = await oneUserDb(id);
    organizer.opinionsOrg.push({
      title: user.name,
      picture: user.picture,
      opinion,
    });
    await organizer.save();

    return organizer.opinionsOrg[organizer.opinionsOrg.length - 1];
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
async function sendNotificationDB(id, msg) {
  try {
    const user = await Users.findOne({ _id: id });
    user.notifications.push({ msg });
    await user.save();
    return user.notifications[user.notifications.length - 1];
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateNotificationDB(reading) {
  try {
    const { idNotifications, read } = reading;
    const user = await Users.findOne({
      notifications: { $elemMatch: { _id: idNotifications } },
    });
    const newRead = user.notifications.find((e) => e._id == idNotifications);
    newRead.read = read;
    console.log(user.notifications.updatedAt)
    await user.save();
    return user.notifications;
  } catch (error) {
    console.log("error", error.message);
    throw new Error(error.message);
  }
}
async function deleteNotificationDB(newDelete) {
  try {
    
    const { idNotifications, delet } = newDelete;
    const user = await Users.findOne({
      notifications: { $elemMatch: { _id: idNotifications } },
    });
    const notificationsDelete = user.notifications.find((e) => e._id == idNotifications);
    notificationsDelete.delete = delet;
    
    await user.save();
    return user.notifications;
  } catch (error) {
    console.log("error", error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  deleteNotificationDB,
  updateNotificationDB,
  sendNotificationDB,
  allUserDb,
  createOneUserDb,
  deleteOneUserDb,
  generateUserComment,
  sendMessageDB,
  validateEmailUserDb,
  oneUserDb,
  updateOneUserDb,
};
