const Users = require('../../../db/Users');
const generarCodigo = require('../../helpers/generateReferralCode');
const bcrypt = require('bcryptjs');

module.exports = async function createOneUserDb(user, codeReferral) {
  try {
    const userCreated = new Users(user);
    const referralCode = generarCodigo()[0];
    const salt = bcrypt.genSaltSync();

    userCreated.nickname = `${userCreated.firstName.split(' ')[0]} ${userCreated.lastName.split(' ')[0]}`;

    userCreated.canReceivedInformation = user.canReceivedInformation;
    userCreated.canNotificationMyEvents = user.canReceivedInformation;
    userCreated.referralCode = referralCode;
    userCreated.password = bcrypt.hashSync(user.password, salt);

    if (codeReferral) {
      const user = await Users.findOne({ referralCode: codeReferral });
      if (user) {
        userCreated.isReferral.code = codeReferral;
        user.referrals.push({
          id: userCreated._id,
          picture: userCreated.userpicture,
          name: userCreated.nickname,
          pending: 5000,
          total: 0,
        });
        await user.save();
      } else throw new Error('El codigo no es valido');
    }

    await userCreated.save();

    return userCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};
