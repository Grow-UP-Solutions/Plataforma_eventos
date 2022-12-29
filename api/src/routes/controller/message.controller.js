const { Router } = require('express');
const { findConversation } = require('../../models/util/functionDB/ConversationDb.js');
const MessageFunctionDb = require('../../models/util/functionDB/message/index.message.js');
const UsersFunctionDb = require('../../models/util/functionDB/users/index.users.js');
const { updateMessage } = require('../services/message.service.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allMessage = await MessageFunctionDb.allMessage();
    return res.status(200).json(allMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const allMessage = await MessageFunctionDb.findMessage(conversationId);
    res.status(200).json(allMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post('/create', async (req, res) => {
  const message = req.body;
  try {
    const newMessage = await MessageFunctionDb.createMessage(message);
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post('/buyer/create', async (req, res) => {
  const message = req.body;
  try {
    const newMessage = await MessageFunctionDb.messageAllBuyer(message);
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.put('/:idMessage/outstanding', async (req, res) => {
  const { idMessage } = req.params;
  const { idUser } = req.body;
  try {
    const messageOutstanding = await MessageFunctionDb.outstanding(idMessage, idUser);
    return res.status(200).json(messageOutstanding);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { conversationId } = req.body;

  try {
    const newMessage = await updateMessage(id, conversationId);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/readAllMessage/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userConversations = await findConversation(id);
    if (!userConversations) throw new Error('No hay conversaciones');

    for (let i = 0; i < userConversations.length; i++) {
      const allMessages = await MessageFunctionDb.findMessage(userConversations[i]._id);
      for (let x = 0; x < allMessages.length; x++) {
        allMessages[x].read = true;
        allMessages[x].save();
      }
    }

    res.json({ message: 'Todos los mensajes leídos correctamente.' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
