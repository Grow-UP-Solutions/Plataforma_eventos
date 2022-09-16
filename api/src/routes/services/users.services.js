require("../../DB");
const Users = require("../../models/db/Users");

module.exports = {
  getAllUsers: async function () {
    const allUsers = await Users.find().populate({ path: "myEventsCreated" });
    return allUsers;
  },

  createUsers: async function (user) {
    const { email } = user;
    const userDB = await Users.findOne({ email: email });
    if(userDB){
      console.log('existe')
      return {msg: 'Este email ya se encuentra registrado'}
    }
    const users = new Users(user);
    console.log('creado')
    return await users.save();
  },
  userUpdate: async function (id, newUser) {
    const newUsers = await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    });

    return newUsers;
  },
  userDelete: async function (id) {
    console.log(id)
    const deleteUser = await Users.findByIdAndDelete({_id:id})
      .populate("myEventsCreated")
      .populate("myOpinions");
    if (!deleteUser) "Usuario no encontardo";

    return deleteUser;
  },
};
