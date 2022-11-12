const Users = require("../../../db/Users");

module.exports= async function updateOneUserDb(id, newUser) {
    try {
       return await Users.findByIdAndUpdate({ _id: id }, newUser, {
          new: 1,
       })
          .populate({ path: "myEventsCreated" })
          .populate({ path: "myFavorites" })
          .populate({ path: "myEventsBooked" })
          .populate({ path: "myOpinions" })
          .populate({ path: "opinionsOrg" });
    } catch (error) {
       throw new Error(error.message);
    }
 }