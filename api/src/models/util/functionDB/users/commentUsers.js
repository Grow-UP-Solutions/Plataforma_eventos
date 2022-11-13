const Users = require('../../../db/Users');

module.exports = async function generateUserComment(id, opinions) {
  try {
    const { idUser, opinion, rating } = opinions;

    const user = await Users.findById(idUser);

    const organizer = await Users.findById(id);
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
};
