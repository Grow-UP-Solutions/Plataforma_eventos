require('../../../DB.js');
const Events = require('../../db/Events.js');
// const {findOneEvent
//  } = require("./EventesDb.js");
const Users = require('../../db/Users.js');
const bcrypt = require('bcryptjs');
const generarCodigo = require('../helpers/generateReferralCode.js');

/** basic user database operations */

async function allUserDb() {
  try {
    return await Users.find()
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'message' });
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
    return { msg: 'Se rerquiere el id del organizador' };
  }
  try {
    return await Users.findById({ _id: idOrganizer })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' })
      .populate('message');
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateOneUserDb(id, newUser) {
  try {
    return await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'myOpinions' })
      .populate({ path: 'opinionsOrg' });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteOneUserDb(id) {
  try {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavorites' })
      .populate({ path: 'myEventsBooked' });
  } catch (error) {
    throw new Error(error.message);
  }
}
/**Creating user in Database */

async function createOneUserDb(user, codeReferral) {
  try {
    const userCreated = new Users(user);
    const referralCode = generarCodigo()[0];
    userCreated.canReceiveInformation = user.canReceiveInformation;
    userCreated.canNotificationMyEvents = user.canReceiveInformation;
    userCreated.referralCode = referralCode;
    const salt = bcrypt.genSaltSync();
    userCreated.password = bcrypt.hashSync(user.password, salt);
    await userCreated.save();
    if (codeReferral) {
      const user = await Users.findOne({ referralCode: codeReferral });
      if (user) {
        userCreated.isReferral = codeReferral;
        await userCreated.save();
        user.referrals = userCreated._id;
        user.saldoPendiente += 5000;
        await user.save();
      } else throw new Error('El codigo no es valido');
    }
    return userCreated;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**crear comentario usuario */

async function generateUserComment(id, opinions) {
  try {
    const { idUser, opinion, rating } = opinions;

    const user = await oneUserDb(idUser);

    const organizer = await oneUserDb(id);
    organizer.opinionsOrg.push({
      title: user.name,
      picture: user.picture,
      rating,
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

    return { Respon: 'mensaje enviado con exito' };
  } catch (error) {
    console.log('error', error.message);
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

    await user.save();
    return user.notifications;
  } catch (error) {
    console.log('error', error.message);
    throw new Error(error.message);
  }
}
async function updateMyFavorites(idUser, idEvent) {
  try {
    const user = await oneUserDb(idUser);
    const event = await Events.findById({ _id: idEvent });
    user.myFavorites.push(event._id);
    await user.save();

    return event;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findAllUpdateNotification(id) {
  try {
    const user = await oneUserDb(id);

    user.notifications.forEach(async (e) => {
      e.read = true;
    });
    await user.save();
    return user.notifications;
  } catch (error) {
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
    console.log('error', error.message);
    throw new Error(error.message);
  }
}

async function updateUserRating(idUser, rating) {
  try {
    const ratinUser = await oneUserDb(idUser);
    if (ratinUser) {
      ratinUser.rating = rating;
      return await ratinUser.save();
    }
    return { msg: 'Evento no encontrado' };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  updateMyFavorites,
  findAllUpdateNotification,
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
  updateUserRating,
};
