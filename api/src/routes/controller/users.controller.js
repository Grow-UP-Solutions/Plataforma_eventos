import { Router } from 'express';
import '../../DB.js';
import { OneUserDb } from '../../models/util/functionDB/UserDb.js';
import {
  getAllUsers,
  createUsers,
  userUpdate,
  userDelete,
  getUser,
  login,
} from '../services/users.services.js';

import { check } from 'express-validator';
import validateFields from '../../middlewares/validate-fields.js';
import { generateJWT } from '../../helpers/jwt.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json({ ERROR_USER: error });
  }
});
<<<<<<< HEAD
router.get('/user', async (req, res) => {
  const { name } = req.query;
  console.log(name);
=======
router.get("/:id", async (req, res) => {
  const {id}= req.params
  
>>>>>>> Development
  try {
    const user = await OneUserDb(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ ERROR_USER: error });
  }
});
router.post(
  '/create',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isStrongPassword(),
    validateFields,
  ],
  async (req, res) => {
    try {
      const user = req.body;
      const userCreate = await createUsers(user);

      const token = await generateJWT(userCreate._id, userCreate.name);

      return res.json({
        ...userCreate,
        token,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
);
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const usersUpdate = await userUpdate(id, newUser);
    return res.status(200).json(usersUpdate);
  } catch (error) {
    return res.status(400).json({ ERROR_USER_UPDATE: error });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userDelete(id);
    return res.status(200).json({
      user: deleteUser,
      msg: 'El usuario ha sido eliminado con exito',
    });
  } catch (error) {
    return res.status(400).json({ FALLO_USER_DELETE: error });
  }
});

/* AUTH */

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isStrongPassword(),
    validateFields,
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await login(email, password);

      if (!user) {
        throw new Error('Correo o contraseña invalida');
      }

      const token = await generateJWT(user._id, user.name);

      res.status(200).json({
        uid: user._id,
        name: user.name,
        email: user.email,
        organizer: user.isOrganizer,
        token,
      });
    } catch (error) {
      return res.status(400).json({ FALLO_USER_LOGIN: error });
    }
  }
);

router.get('/renew', validateJWT, async (req, res) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.status(201).json({
    uid,
    name,
    token,
  });
});

export default router;
