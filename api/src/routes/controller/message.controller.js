const { Router } = require('express');
const {
  createMessage,
  findMessage,
  allMessageDB
} = require('../../models/util/functionDB/messageDb.js');
const { updateMessage } = require('../services/message.service.js');

const router = Router();
router.get('/', async (req,res)=>{
  try {
    const allMessage = await allMessageDB()
    return res.status(200).json(allMessage)
  } catch (error) {
    return res.status(500).json(error.message);
    
  }
})

router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const allMessage = await findMessage(conversationId);
    res.status(200).json(allMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post('/create', async (req, res) => {
  const message = req.body;
  try {
    const newMessage = await createMessage(message);
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  
 
  try {
    const newMessage = await updateMessage(id);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
