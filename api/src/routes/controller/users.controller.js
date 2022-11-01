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
  sendNotificationsUser,
  getUserByEmail,
  eventesFavorites,
} = require('../services/users.services.js');

const passport = require('passport');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const validateFields = require('../../models/util/middlewares/validate-fields.js');
const { generateJWT } = require('../../models/util/helpers/jwt.js');
const { generateJWTPassword } = require('../../models/util/helpers/jwtPassword.js');
const { validateJWT } = require('../../models/util/middlewares/validate-jwt.js');
const { validateJWTPassword } = require('../../models/util/middlewares/validate-jwt-password.js');
const { sendVerifyMail } = require('../../models/util/mailer/confirmEmail.js');
const { sendMailToOrganizer } = require('../../models/util/mailer/mailToConverOrganizer');
const { changePasswordMail } = require('../../models/util/mailer/changePassword.js');
const {
  validateEmailUserDb,
  updateNotificationDB,
  deleteNotificationDB,
  findAllUpdateNotification,
  updateMyFavorites,
  updateUserRating,
} = require('../../models/util/functionDB/UserDb.js');
const {
  createCodeVerifyMail,
  deleteCodeVerifyMail,
  getCodeVerifyEmail,
} = require('../../models/util/functionDB/CodeVerifyMailDb.js');
const { generateJWTOrganizer } = require('../../models/util/helpers/jwtOrganizer.js');
const { validateJWTOrganizer } = require('../../models/util/middlewares/validate-organizer.js');
const { allMessageReciverUserDB } = require('../../models/util/functionDB/messageDb.js');
const { sendMailUserAccept } = require('../../models/util/mailer/mailUserAccept.js');
const { sendMailUserRejected } = require('../../models/util/mailer/mailUserRejected.js');

const router = Router();
/**/ ///////////////Rutas GET////////////// */

router.get('/checkValidateTokenOrganizer/', validateJWTOrganizer, async (req, res) => {
  const { name, phone, document, tel, email, referenciaU, referenciaZ, id } = req;

  try {
    res.status(200).json({
      name,
      phone,
      document,
      tel,
      email,
      referenciaU,
      referenciaZ,
      id,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ ERROR_USER: error.message });
  }
});
router.get('/:idUser/message', async (req, res) => {
  const { idUser } = req.params;

  try {
    const allConversation = await allMessageReciverUserDB(idUser);
    return res.status(200).json(allConversation);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
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

router.get('/existsEmail/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const isEmailExists = await getUserByEmail(email);

    res.json({ isEmailExists });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**/ //////////////Rutas POST/////////////// */

router.post('/acceptOrRejectedOrganizer', async (req, res) => {
  const { option, id } = req.body;
  let message = '';
  try {
    const user = await getUser(id);
    if (option === 'accept') {
      user.isOrganizer = true;
      user.isProccessingToOrganizer = false;
      user.isRejected = false;
      user.referenceZ = user.referenceU.replace('U', 'Z');
      await sendMailUserAccept(user.name, user.email);
      message = 'Aceptado';
    } else if (option === 'reject') {
      user.isRejected = true;
      user.isOrganizer = false;
      user.isProccessingToOrganizer = false;
      user.referenceZ = '';
      await sendMailUserRejected(user.name, user.email);
      message = 'Rechazado';
    } else {
      return res.status(400).json({ message: 'error' });
    }
    await user.save();

    res.status(200).json({
      message,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.put('/:idUser/favorites', async (req, res) => {
  const { idUser } = req.params;
  const { idEvent } = req.body;
  try {
    const myFavorites = await eventesFavorites(idUser, idEvent);
    return res.status(200).json(myFavorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/notifications', async (req, res) => {
  const notificaciones = req.body;
  try {
    const newNotification = await sendNotificationsUser(notificaciones);
    return res.status(200).json(newNotification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put('/notifications', async (req, res) => {
  const read = req.body;
  try {
    const notificacionesRead = await updateNotificationDB(read);
    return res.status(200).json(notificacionesRead);
  } catch (error) {
    res.status(500).json(error.Menssage);
  }
});

router.put('/:idUser/notifications', async (req, res) => {
  const { idUser } = req.params;
  try {
    const notificacionesRead = await findAllUpdateNotification(idUser);
    return res.status(200).json(notificacionesRead);
  } catch (error) {
    res.status(500).json(error.Menssage);
  }
});
router.put('/:idUser/rating', async (req, res) => {
  const { idUser } = req.params;
  const { rating } = req.body;
  try {
    const userRating = await updateUserRating(idUser, rating);
    return res.status(200).json(userRating);
  } catch (error) {
    return res.status(500).json({ FALLO_UPDATE: error.message });
  }
});

router.delete('/notifications', async (req, res) => {
  const newDelete = req.body;
  try {
    const notificacionesDelete = await deleteNotificationDB(newDelete);
    return res.status(200).json(notificacionesDelete);
  } catch (error) {
    res.status(500).json(error.Menssage);
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
      const {codeReferral}= req.query
      const userCreate = await createUsers(user,codeReferral);

      const time = '2h';
      const token = await generateJWT(userCreate._id, userCreate.name, time);

      return res.json({
        uid: userCreate._id,
        name: userCreate.name,
        nickname: userCreate.nickname,
        email: userCreate.email,
        organizer: userCreate.isOrganizer,
        picture: user.userpicture,
        isProfileCompleted: user.isProfileCompleted,
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
    console.log(opinion);
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
    const { email, password, rememberMe } = req.body;

    let time = '2h';

    if (rememberMe) time = '365d';

    try {
      const user = await login(email, password);

      const token = await generateJWT(user._id, user.name, time);

      res.status(200).json({
        uid: user._id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        organizer: user.isOrganizer,
        picture: user.userpicture,
        isProfileCompleted: user.isProfileCompleted,
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
  const time = req.time;
  try {
    const user = await getUser(uid);
    const token = await generateJWT(uid, name, time);

    res.status(201).json({
      uid: user._id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      organizer: user.isOrganizer,
      picture: user.userpicture,
      isProfileCompleted: user.isProfileCompleted,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/confirmEmail', async (req, res) => {
  const { code } = req.body;

  try {
    const codedb = await getCodeVerifyEmail(code);

    if (!codedb) throw new Error('Código incorrecto');

    if (code === codedb.validacion) {
      await deleteCodeVerifyMail(code);
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

  const codeDb = await createCodeVerifyMail(code);

  try {
    const response = await sendVerifyMail(email, codeDb.validacion);

    res.status(201).json({
      message: response.msg,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**/ ///////////Rutas PUT///////////////////////////////// */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  let newUser = req.body;

  try {
    if (newUser.password) {
      const salt = bcrypt.genSaltSync();
      const newPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = newPassword;
    }

    const usersUpdate = await userUpdate(id, newUser);
    return res.status(200).json(usersUpdate);
  } catch (error) {
    return res.status(500).json({ ERROR_USER_UPDATE: error.message });
  }
});

router.put('/updateCanReceiveInformation/:id', async (req, res) => {
  const { id } = req.params;
  const { canReceiveInformation } = req.body;

  try {
    const userModel = await getUser(id);
    userModel.canReceiveInformation = canReceiveInformation;
    await userModel.save();
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

router.put('/updateCanNotificationMyEvents/:id', async (req, res) => {
  const { id } = req.params;
  const { canNotificationMyEvents } = req.body;

  try {
    const userModel = await getUser(id);
    userModel.canNotificationMyEvents = canNotificationMyEvents;
    await userModel.save();
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

router.put('/updateUserPicture/:id', async (req, res) => {
  const { id } = req.params;
  const { urlImage } = req.body;
  const user = await getUser(id);
  user.userpicture = urlImage;
  await user.save();
  res.json({ success: true });
});

router.post('/isSamePassword/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await getUser(id);

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new Error('Contraseña invalida');
    }
    return res.status(200).json({
      message: 'Si es correcto',
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
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

router.get('/mail/validateTokenPassword', validateJWTPassword, async (req, res) => {
  const email = req.email;
  try {
    res.json({ email });
  } catch (error) {
    res.status(400).json({
      message: 'Error en la petición',
    });
  }
});

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
    window.opener.postMessage(${userString}, '${process.env.CLIENT_URL || 'http://localhost:3000'}')
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
    window.opener.postMessage(${userString}, '${process.env.CLIENT_URL || 'http://localhost:3000'}')
    </script>
    </html>
    `
    );
  }
);

/* SEND EMAIL FOR SET ORGANIZER */

router.post('/requestToOrganizer/', async (req, res) => {
  const { user } = req.body;
  try {
    const token = await generateJWTOrganizer(
      user.name,
      user.email,
      user.document,
      user.tel,
      user.phone,
      user.referenciaU,
      user.referenciaZ,
      user.id
    );
    await sendMailToOrganizer(
      user.name,
      `${process.env.CLIENT_URL || 'http://localhost:3000'}/admin/check-solicitud-organizador/${token}`,
      user.email
    );

    const userModel = await getUser(user.id);
    userModel.isProccessingToOrganizer = true;
    await userModel.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
