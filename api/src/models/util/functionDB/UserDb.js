import '../../../DB.js';
import Users from '../../db/Users.js';
import bcrypt from 'bcryptjs';

/** basic user database operations */

export async function allUserDb() {
  try {
    return await Users.find()
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' });
  } catch (error) {
    return { message: error.message };
  }
}
export async function validateEmailUserDb(email) {
  try {
    return await Users.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function oneUserDb(id) {
  const idOrganizer = id;
  if (!idOrganizer) {
    return { msg: 'Se rerquiere el id del organizador' };
  }
  try {
    return await Users.findById({ _id: idOrganizer })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'opinionsOrg' });
  } catch (error) {
    return { message: error.message };
  }
}
export async function updateOneUserDb(id, newUser) {
  try {
    return await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' })
      .populate({ path: 'myOpinions' })
      .populate({ path: 'opinionsOrg' });
  } catch (error) {
    return { message: error.message };
  }
}
export async function deleteOneUserDb(id) {
  try {
    return await Users.findByIdAndDelete({ _id: id })
      .populate({ path: 'myEventsCreated' })
      .populate({ path: 'myFavourites' })
      .populate({ path: 'myEventsBooked' });
  } catch (error) {
    return { message: error.message };
  }
}
/**Creating user in Database */

export async function createOneUserDb(user) {
  try {
    const userCreated = new Users(user);
    const salt = bcrypt.genSaltSync();

    userCreated.password = bcrypt.hashSync(user.password, salt);

    await userCreated.save();
    return userCreated;
  } catch (error) {
    return { message: error.message };
  }
}

/**crear comentario usuario */

export async function generateUserComment(id, opinion) {
  try {
    const { idUser } = opinion;

    const user = await oneUserDb(idUser);

    const organizer = await oneUserDb(id);

    opinion.user = user._id;

    organizer.opinionsOrg.push(opinion);
    return await organizer.save();
  } catch (error) {
    return { message: error.message };
  }
}

export async function sendMessageDB(idSend, idGet, msg) {
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
    return { Respon: 'mensaje enviado con exito' };
  } catch (error) {
    return { message: error.message };
  }
}
