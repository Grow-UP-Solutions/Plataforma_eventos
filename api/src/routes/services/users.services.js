import {
  allUserDb,
  oneUserDb,
  updateOneUserDb,
  deleteOneUserDb,
  createOneUserDb,
  validateEmailUserDb,
  generateUserComment,
  sendMessageDB,
} from '../../models/util/functionDB/UserDb.js';

import bcrypt from 'bcryptjs';
import { AllEventsDb } from '../../models/util/functionDB/EventesDb.js';

export async function getAllUsers() {
  const allUsers = allUserDb();
  return allUsers;
}
export async function getUser(id) {
  try {
    const user = oneUserDb(id);
    if (!user) {
      msg: `El usuario no fue encontrado`;
    }
    return user;
  } catch (error) {
    return { message: error.message };
  }
}
export async function createUsers(user) {
  const { email } = user;
  try {
    const userDB = await validateEmailUserDb(email);

    if (userDB) {
      throw new Error('El email ya se encuentra registrado');
    }

    const users = await createOneUserDb(user);

    return users;
  } catch (error) {
    return { message: error.message };
  }
}
export async function createOrganizerComment(id, opinion) {
  try {
    const generateComment = await generateUserComment(id, opinion);
    return generateComment;
  } catch (error) {
    return { message: error.message };
  }
}
export async function getAllCommentUser(id) {
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
    return { message: error.message };
  }
}
export async function userUpdate(id, newUser) {
  try {
    const newUsers = updateOneUserDb(id, newUser);

    return newUsers;
  } catch (error) {
    return { message: error.message };
  }
}
export async function userDelete(id) {
  try {
    const deleteUser = await deleteOneUserDb(id);
    if (!deleteUser) 'Usuario no encontardo';

    return deleteUser;
  } catch (error) {
    return { message: error.message };
  }
}

export async function sendMessageUser(idSend, message) {
  try {
    const { idGet, msg } = message;
    const sendMessage = await sendMessageDB(idSend, idGet, msg);
    return sendMessage;
  } catch (error) {
    return { message: error.message };
  }
}

export async function login(email, password) {
  try {
    const user = await validateEmailUserDb(email);

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
