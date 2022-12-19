const bcrypt = require('bcryptjs');
const validatonType = require('../../models/util/notifications/validatonType.js');
const UsersFunctionDb = require('../../models/util/functionDB/users/index.users.js');
const EventFunctionDb = require('../../models/util/functionDB/event/index.event.js');
const Users = require('../../models/db/Users.js');
const { sendMailForDeleteAccount } = require('../../models/util/mailer/mailToSendReasonForDeleteAccount.js');

async function getAllUsers() {
  const allUsers = await UsersFunctionDb.allUserDb();
  return allUsers;
}
async function getUser(id) {
  try {
    const user = await UsersFunctionDb.oneUser(id);
    if (!user) {
      throw new Error(`El usuario no fue encontrado`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUsers(user, code) {
  const { email } = user;
  try {
    const userDB = await UsersFunctionDb.validationEmail(email);

    if (userDB) {
      throw new Error('El email ya se encuentra registrado');
    }

    const users = await UsersFunctionDb.createUsers(user, code);

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createOrganizerComment(id, opinion) {
  try {
    console.log('o2:',opinion)
    const generateComment = await UsersFunctionDb.commentUsers(id, opinion);
    console.log(generateComment)
    return generateComment;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllCommentUser(id) {
  try {
    const allEvents = await EventFunctionDb.allEvents();
    const allUser = await UsersFunctionDb.allUsers();

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
    const newUsers = await UsersFunctionDb.updateUsers(id, newUser);

    return newUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function userDelete(id, reasonForDeleteAccount) {
  try {
    const deleteUser = await UsersFunctionDb.deleteUsers(id);
    if (!deleteUser) 'Usuario no encontrado';
    const { name, email } = deleteUser;
    await sendMailForDeleteAccount(name, email, reasonForDeleteAccount);
    return deleteUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function eventesFavorites(idUser, idEvent) {
  try {
    const user = await UsersFunctionDb.oneUser(idUser);
    const eventeFavorite = user.myFavorites.find((e) => e._id == idEvent);

    if (!eventeFavorite) {
      user.myFavorites.push(idEvent);
      await user.save();
      return { favorites: user.myFavorites };
    }

    return { msg: 'el evento existe en favoritos', eventeFavorite };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function eventesDeleteFavorites(idUser, idEvent) {
  try {
    const user = await UsersFunctionDb.oneUser(idUser);
    const eventeFavorite = user.myFavorites.find((e) => e._id == idEvent);

    if (eventeFavorite) {
      user.myFavorites = user.myFavorites.filter((e) => e._id !== eventeFavorite._id);
      await user.save();
      return { favorites: user.myFavorites };
    }

    return { msg: 'el evento no existe en favoritos', eventeFavorite };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function sendNotificationsUser(notifications) {
  const { type, idUser } = notifications;
  const msg = validatonType(type);
  try {
    const newNotification = await UsersFunctionDb.sendNotification(idUser, msg);
    return newNotification;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(email, password) {
  try {
    const user = await UsersFunctionDb.validationEmail(email);

    if (!user) {
      throw new Error('Email no encontrado en sistema');
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await UsersFunctionDb.validationEmail(email);

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  eventesFavorites,
  eventesDeleteFavorites,
  sendNotificationsUser,
  getAllUsers,
  getUser,
  createUsers,
  createOrganizerComment,
  login,
  userDelete,
  userUpdate,
  getAllCommentUser,
  getUserByEmail,
};
