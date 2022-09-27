import { Router } from "express";
import "../../DB.js";
import { OneUserDb } from "../../models/util/functionDB/UserDb.js";
import { getAllUsers, createUsers, userUpdate, userDelete } from "../services/users.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
    
  } catch (error) {
    return res.status(400).json({ERROR_USER:error})
  }
});
router.get("/:id", async (req, res) => {
  const {id}= req.params
  
  try {
    const user = await OneUserDb(id);
    return res.status(200).json(user);
    
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
router.put('/update/:id',async (req,res)=>{
  try {
    
    const {id}= req.params
    const newUser = req.body
    const usersUpdate = await userUpdate(id,newUser)
    return res.status(200).json(usersUpdate)
  } catch (error) {
    return res.status(400).json({ERROR_USER_UPDATE:error})
  }
})
router.delete('/delete/:id', async (req,res)=>{
  try {
    const {id} = req.params
      
    const deleteUser= await userDelete(id)
    return res.status(200).json({user: deleteUser,msg: 'El usuario ha sido eliminado con exito'})
    
  } catch (error) {
    return res.status(400).json({FALLO_USER_DELETE: error})
  }
})
export default router;
