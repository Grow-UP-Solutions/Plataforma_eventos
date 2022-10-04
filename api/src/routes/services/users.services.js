import {
  allUserDb,
  oneUserDb,
  updateOneUserDb,
  deleteOneUserDb,
  createOneUserDb,
  validateEmailUserDb,
} from '../../models/util/functionDB/UserDb.js';

import bcrypt from 'bcryptjs';

export async function getAllUsers() {
  const allUsers = allUserDb();
  return allUsers;
}
export async function getUser(id) {
  const user = oneUserDb(id);
  if (!user) {
    msg: `El usuario ${name} no fue encontrado`;
  }
  return user;
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
    throw new Error(error.message);
  }
}
export async function userUpdate(id, newUser) {
  const newUsers = updateOneUserDb(id, newUser);

  return newUsers;
}
export async function userDelete(id) {
  const deleteUser = deleteOneUserDb(id);
  if (!deleteUser) 'Usuario no encontardo';

  return deleteUser;
}

export async function login(email, password) {
  try {
    const user = await validateEmailUserDb(email);

    if (!user) {
      throw new Error('El usuario no está registrado');
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new Error('El password es incorrecto');
    }

    return user;
  } catch (error) {
    throw new Error('FALLO_SERVICIO_USERLOGIN');
  }
}

export async function confirmEmail(code) {
  try {
    const user = await getUser();
  } catch (error) {}
}
