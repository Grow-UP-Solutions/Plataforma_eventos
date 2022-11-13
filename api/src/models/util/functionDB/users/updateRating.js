const Users = require('../../../db/Users');

module.exports = async function updateUserRating(idUser, rating) {
  try {
    const ratinUser = await Users.findById(idUser);
    if (ratinUser) {
      ratinUser.rating = rating;
      return await ratinUser.save();
    }
    return { msg: 'Evento no encontrado' };
  } catch (error) {
    throw new Error(error.message);
  }
};
