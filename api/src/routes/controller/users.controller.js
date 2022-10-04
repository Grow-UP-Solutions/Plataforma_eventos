import { Router } from 'express';
import '../../DB.js';
import {
  getAllUsers,
  createUsers,
  userUpdate,
  userDelete,
  getUser,
  login,
  createOrganizerComment,
  getAllCommentUser,
} from '../services/users.services.js';

import passport from 'passport';

import { check } from 'express-validator';
import validateFields from '../../models/util/middlewares/validate-fields.js';
import { generateJWT } from '../../models/util/helpers/jwt.js';
import { validateJWT } from '../../models/util/middlewares/validate-jwt.js';
import { sendVerifyMail } from '../../models/util/mailer/confirmEmail.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json({ ERROR_USER: error });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
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
        uid: userCreate._id,
        name: userCreate.name,
        email: userCreate.email,
        organizer: userCreate.isOrganizer,
        token,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
);

router.post('/commentOrganizer/:id', async (req, res) => {
  try {
    const opinion = req.body;
    const { id } = req.params;
    const opinionCreat = await createOrganizerComment(id, opinion);
    return res.status(200).json(opinionCreat);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
router.get('/opinionsUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allComment = await getAllCommentUser(id);
    return res.status(200).json(allComment);
  } catch (error) {
    return res.status(400).json(error);
  }
});
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

router.get('/login/renew', validateJWT, async (req, res) => {
  const uid = req.uid;
  const name = req.name;

  const user = await getUser(uid);
  const token = await generateJWT(uid, name);

  res.status(201).json({
    uid: user._id,
    name: user.name,
    email: user.email,
    organizer: user.isOrganizer,
    token,
  });
});

router.post('/confirmEmail', async (req, res) => {
  const { code, uid } = req.body;

  try {
    const user = await getUser(uid);

    if (code === user.code) {
      return res.status(201).json({
        success: true,
        message: 'Código correcto',
      });
    } else {
      throw new Error('Código incorrecto');
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

router.post('/sendEmailForConfirm', async (req, res) => {
  const { uid } = req.body;
  const { email, code } = await getUser(uid);

  console.log(email, code);

  const response = await sendVerifyMail(email, code);

  res.status(201).json({
    message: response.msg,
  });
});

/* PROVIDERS  */

/* FACEBOOK */

router.get(
  '/login/facebook',
  passport.authenticate('auth-facebook', {
    prompt: 'select_account',
    session: false,
    scope: ['public_profile', 'email'],
  })
);

router.get(
  '/login/facebook/callback',
  passport.authenticate('auth-facebook', {
    failureRedirect: '/login/facebook',
    session: false,
  }),
  (req, res) => {
    const userString = JSON.stringify(req.user);
    res.send(
      `<!DOCTYPE html> 
      
    <html lang="en">
    <body>
    </body>
    <script>
    window.opener.postMessage(${userString}, 'http://localhost:3000')
    </script>
    </html>
    `
    );
  }
);

/* GOOGLE */

router.get(
  '/login/google',
  passport.authenticate('google', {
    prompt: 'select_account',
    session: false,
    scope: ['email', 'profile'],
  })
);

router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/google',
    session: false,
  }),
  (req, res) => {
    const userString = JSON.stringify(req.user);
    res.send(
      `<!DOCTYPE html> 
      
    <html lang="en">
    <body>
    </body>
    <script>
    window.opener.postMessage(${userString}, 'http://localhost:3000')
    </script>
    </html>
    `
    );
  }
);

export default router;
