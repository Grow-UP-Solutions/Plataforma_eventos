import '../../../DB.js';
import Users from '../../db/Users.js';
import bcrypt from 'bcryptjs';

/** basic user database operations */

export async function allUserDb() {
  return await Users.find()
    .populate({ path: 'myEventsCreated' })
    .populate({ path: 'myFavourites' })
    .populate({ path: 'myEventsBooked' })
    .populate({ path: 'myOpinions' })
    .populate({ path: 'opinionsOrg' });
}
export async function validateEmailUserDb(email) {
  try {
    return await Users.findOne({ email: email })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'myOpinions' })
      .populate({ path: 'opinionsOrg' });
  } catch (error) {
    throw new Error('Ha fallado validate email user db');
  }
}
export async function oneUserDb(id) {
  try {
    return await Users.findById({ _id: id })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'myOpinions' })
      .populate({ path: 'opinionsOrg' });
  } catch (error) {
    throw new Error('Ha fallado validate id user db');
  }
}
export async function updateOneUserDb(id, newUser) {
  return await Users.findByIdAndUpdate({ _id: id }, newUser, {
    new: 1,
  })
    .populate({ path: 'myEventsCreated' })
    .populate({ path: 'myFavourites' })
    .populate({ path: 'myEventsBooked' })
    .populate({ path: 'myOpinions' })
    .populate({ path: 'opinionsOrg' });
}
export async function deleteOneUserDb(id) {
  return await Users.findByIdAndDelete({ _id: id })
    .populate({ path: 'myEventsCreated' })
    .populate({ path: 'myFavourites' })
    .populate({ path: 'myEventsBooked' })
    .populate({ path: 'myOpinions' })
    .populate({ path: 'opinionsOrg' });
}
/**Creating user in Database */

export async function createOneUserDb(user) {
  try {
    const userCreated = new Users(user);
    const salt = bcrypt.genSaltSync();

    userCreated.password = bcrypt.hashSync(user.password, salt);

    let code = '';

    for (let x = 0; x < 6; x++) {
      code = code + Math.trunc(Math.random() * 10);
    }

    userCreated.code = code;

    await userCreated.save();
    return userCreated;
  } catch (error) {
    return { FALLO_CREATEUSER_DB: error };
  }
}
