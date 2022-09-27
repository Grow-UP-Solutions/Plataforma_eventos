import {
  allUserDb,
  OneUserDb,
  updateOneUserDb,
  deleteOneUserDb,
  createOneUserDb,
} from "../../models/util/functionDB/UserDb.js";



export async function getAllUsers() {
  const allUsers = allUserDb();
  return allUsers;
  
}
export async function getUser(name) {
  const user = OneUserDb(name);
  if (!user) { msg: `El usuario ${name} no fue encontrado`}
  return user;
}
export async function createUsers(user) {
  const { email } = user;
  try {
    const userDB = await OneUserDb(email);
    
    if (userDB) {
      
      return { msg: "Este email ya se encuentra registrado" };
    }
    const users = await createOneUserDb(user);
   
    return users;
  } catch (error) {
    return { FALLO_USERCREATE_SERVICIO: error };
  }
}
export async function userUpdate(id, newUser) {
  const newUsers = updateOneUserDb(id, newUser);

  return newUsers;
}
export async function userDelete(id) {
  const deleteUser = deleteOneUserDb(id);
  if (!deleteUser) "Usuario no encontardo";

  return deleteUser;
}
