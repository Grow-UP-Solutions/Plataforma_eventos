const bcrypt = require('bcryptjs');
const { Router } = require('express');
require('../../DB.js');
const {
  getAllUsers,
  createUsers,
  userUpdate,
  userDelete,
  getUser,
  login,
  createOrganizerComment,
  getAllCommentUser,
  sendMessageUser,
} = require('../services/users.services.js');

const passport = require('passport');

const { check } = require('express-validator');
const validateFields = require('../../models/util/middlewares/validate-fields.js');
const { generateJWT } = require('../../models/util/helpers/jwt.js');
const {
  generateJWTPassword,
} = require('../../models/util/helpers/jwtPassword.js');
const {
  validateJWT,
} = require('../../models/util/middlewares/validate-jwt.js');
const {
  validateJWTPassword,
} = require('../../models/util/middlewares/validate-jwt-password.js');
const { sendVerifyMail } = require('../../models/util/mailer/confirmEmail.js');
const {
  changePasswordMail,
} = require('../../models/util/mailer/changePassword.js');
const {
  validateEmailUserDb,
} = require('../../models/util/functionDB/UserDb.js');
const {
  createCodeVerifyMail,
  deleteCodeVerifyMail,
  getCodeVerifyEmail,
} = require('../../models/util/functionDB/CodeVerifyMailDb.js');

//const Validacion = require('../../models/db/Validacion.js');

const router = Router();
/**/ ///////////////Rutas GET////////////// */
router.get('/', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ ERROR_USER: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ ERROR_USER: error.message });
  }
});
router.get('/opinionsUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allComment = await getAllCommentUser(id);
    return res.status(200).json(allComment);
  } catch (error) {
    return res.status(500).json({ ERROR_OPIONSUSER: error.message });
  }
});
router.get('/login/renew', validateJWT, async (req, res) => {
  const uid = req.uid;
  const name = req.name;
  try {
    const user = await getUser(uid);
    const token = await generateJWT(uid, name);

    res.status(201).json({
      uid: user._id,
      name: user.name,
      email: user.email,
      organizer: user.isOrganizer,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
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
    try {
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
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
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
    try {
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
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);
/**/ //////////////Rutas POST/////////////// */

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
      return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
});
router.post('/message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const msg = req.body;
    const senMenssage = await sendMessageUser(id, msg);
    return res.status(200).json(senMenssage);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

      const token = await generateJWT(user._id, user.name);

      res.status(200).json({
        uid: user._id,
        name: user.name,
        email: user.email,
        organizer: user.isOrganizer,
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get('/login/renew', validateJWT, async (req, res) => {
  const uid = req.uid;
  const name = req.name;

  try {
    const user = await getUser(uid);

    const token = await generateJWT(uid, name);

    res.status(201).json({
      uid: user._id,
      name: user.name,
      email: user.email,
      organizer: user.isOrganizer,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/confirmEmail', async (req, res) => {
  const { code } = req.body;

  try {
    const codedb = await getCodeVerifyEmail(code);

    if (code === codedb.code) {
      return res.status(201).json({
        success: true,
        message: 'Código correcto',
      });
    } else {
      throw new Error('Código incorrecto');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post('/sendEmailForConfirm', async (req, res) => {
  const { email } = req.body;

  let code = '';

  for (let x = 0; x < 6; x++) {
    code = code + Math.trunc(Math.random() * 10);
  }

  const codeDb = createCodeVerifyMail(code);
  await codeDb.save();

  try {
    const response = await sendVerifyMail(email, codeDb.code);

    res.status(201).json({
      message: response.msg,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**/ ///////////Rutas PUT///////////////////////////////// */
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const usersUpdate = await userUpdate(id, newUser);
    return res.status(200).json(usersUpdate);
  } catch (error) {
    return res.status(500).json({ ERROR_USER_UPDATE: error.message });
  }
});
/**/ ///////////////Rutas DELETE/////////////////////////// */
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userDelete(id);
    return res.status(200).json({
      user: deleteUser,
      msg: 'El usuario ha sido eliminado con exito',
    });
  } catch (error) {
    return res.status(500).json({ FALLO_USER_DELETE: error.message });
  }
});

/* CHANGE PASSWORD */

router.post('/sendMailChangePassword', async (req, res) => {
  const { email } = req.body;

  const token = await generateJWTPassword(email);

  const link = `http://localhost:3000/cambiarcontrasenia/${token}`;

  const response = await changePasswordMail(email, link);

  res.status(201).json({
    message: response.msg,
  });
});

router.get(
  '/mail/validateTokenPassword',
  validateJWTPassword,
  async (req, res) => {
    const email = req.email;
    try {
      res.json({ email });
    } catch (error) {
      res.status(400).json({
        message: 'Error en la petición',
      });
    }
  }
);

router.post('/changePassword', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await validateEmailUserDb(email);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.status(201).json({
      message: 'Cambio de contraseña exitoso',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
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

module.exports = router;
