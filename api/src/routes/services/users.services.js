
import Users from "../../models/db/Users.js";
import { getAllUserDb, getOneUserDb, updateOneUserDb, deleteOneUserDb } from "../../models/util/functionDB/UserDb.js";

export async function getAllUsers() {
  const allUsers = getAllUserDb();
  return allUsers;
}
export async function getUser(name) {
  const user = getOneUserDb(name);
  if (!user) { msg: `El usuario ${name} no fue encontrado`; }
  return user;
}
export async function createUsers(user) {
  const { email } = user;
  const userDB = await getOneUserDb(email);
  console.log(userDB);
  if (userDB) {
    console.log('existe');
    return { msg: 'Este email ya se encuentra registrado' };
  }
  const users = new Users(user);
  console.log('creado');
  return await users.save();
}
export async function userUpdate(id, newUser) {
  const newUsers = updateOneUserDb(id, newUser);

  return newUsers;
}
export async function userDelete(id) {

  const deleteUser = deleteOneUserDb(id);
  if (!deleteUser)
    "Usuario no encontardo";

  return deleteUser;
}
