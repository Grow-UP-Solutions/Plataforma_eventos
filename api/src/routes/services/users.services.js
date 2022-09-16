require("../../DB");
const Users = require("../../models/db/Users");

module.exports = {
  getAllUsers: async function () {
    const allUsers = await Users.find().populate({ path: "myEventsCreated" });
    return allUsers;
  },

  createUsers: async function (user) {    
    const users = new Users(user);
    return await users.save();
  },
  userUpdate: async function (id, newUser) {
    const newUsers = await Users.findByIdAndUpdate({ _id: id }, newUser, {
      new: 1,
    });

    return newUsers;
  },
};
