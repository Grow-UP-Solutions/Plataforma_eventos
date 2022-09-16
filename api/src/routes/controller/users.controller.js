const { Router } = require("express");
require("../../DB");
const Users = require("../../models/db/Users");
const { getAllUsers, createUsers, userUpdate } = require("../services/users.services");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
    
  } catch (error) {
    return res.status(400).json({ERROR_USER:error})
  }
});
router.post("/create", async (req, res) => {
  try {
    
    const user = req.body;
    const userCreate = await createUsers(user);
    return res.json(userCreate)
  } catch (error) {
    return res.status(400).json({ERROR_USER_CREATE:error})
  }
});
router.post('/update/:id',async (req,res)=>{
  try {
    
    const {id}= req.params
    const newUser = req.body
    const usersUpdate = await userUpdate(id,newUser)
    return res.status(200).json(usersUpdate)
  } catch (error) {
    return res.status(400).json({ERROR_USER_UPDATE:error})
  }
})
module.exports = router;
