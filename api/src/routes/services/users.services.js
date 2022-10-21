const {
  allUserDb,
  oneUserDb,
  updateOneUserDb,
  deleteOneUserDb,
  createOneUserDb,
  validateEmailUserDb,
  generateUserComment,
  sendMessageDB,
  sendNotificationDB,
  updateMyFavorites,
} = require("../../models/util/functionDB/UserDb.js");

const bcrypt = require("bcryptjs");
const { AllEventsDb } = require("../../models/util/functionDB/EventesDb.js");
const {
  EVENT,
  UPDATE_EVENT,
  FAVORITOS,
} = require("../../models/util/notifications/notifications.types.js");
const validatonType = require("../../models/util/notifications/validatonType.js");

async function getAllUsers() {
  const allUsers = allUserDb();
  return allUsers;
}
async function getUser(id) {
  try {
    const user = oneUserDb(id);
    if (!user) {
      throw new Error(`El usuario no fue encontrado`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function createUsers(user) {
  const { email } = user;
  try {
    const userDB = await validateEmailUserDb(email);

    if (userDB) {
      throw new Error("El email ya se encuentra registrado");
    }

    const users = await createOneUserDb(user);

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function createOrganizerComment(id, opinion) {
  try {
    const generateComment = await generateUserComment(id, opinion);
    return generateComment;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getAllCommentUser(id) {
  try {
    const allEvents = await AllEventsDb();
    const allUser = await allUserDb();
    const allCommentUser = allUser
      .map((e) => e.opinionsOrg)
      .flat()
      .filter((e) => e.user == id);
    const allCommnt = allEvents
      .map((e) => e.opinions)
      .flat()
      .filter((e) => e.user == id);
    return allCommnt.concat(allCommentUser);
  } catch (error) {
    throw new Error(error.message);
  }
}
async function userUpdate(id, newUser) {
  try {
    const newUsers = updateOneUserDb(id, newUser);

    return newUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function userDelete(id) {
  try {
    const deleteUser = await deleteOneUserDb(id);
    if (!deleteUser) "Usuario no encontardo";

    return deleteUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function sendMessageUser(idSend, message) {
  try {
    const { idGet, msg } = message;
    const sendMessage = await sendMessageDB(idSend, idGet, msg);
    return sendMessage;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function eventesFavorites(idUser,idEvent) {
  try {
    const user = await oneUserDb(idUser)
    const eventeFavorite = user.myFavorites.find((e) => e._id == idEvent);
    
    if(!eventeFavorite){
      
      const addFavorite = await updateMyFavorites(idUser,idEvent)
      return addFavorite
    }
    // {msg: "el evento existe en favoritos" , eventeFavorite}
    return 
  } catch (error) {
    throw new Error(error.message);
    
  }
  
}


async function sendNotificationsUser(notifications) {
  const { type, idUser } = notifications;
  const msg = validatonType(type);
  try {
    const newNotification = await sendNotificationDB(idUser, msg);
    return newNotification;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(email, password) {
  try {
    const user = await validateEmailUserDb(email);

    if (!user) {
      throw new Error("Email no encontrado en sistema");
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  eventesFavorites,
  sendNotificationsUser,
  getAllUsers,
  getUser,
  createUsers,
  createOrganizerComment,
  login,
  sendMessageUser,
  userDelete,
  userUpdate,
  getAllCommentUser,
};
