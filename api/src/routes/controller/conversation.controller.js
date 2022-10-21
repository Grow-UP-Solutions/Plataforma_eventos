const { Router } = require('express');
const {
  createConversation,
  findAllConversation,
  findConversation,
  allConversationDB,
} = require('../../models/util/functionDB/ConversationDb.js');

const router = Router();



router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    const allConversation = await findConversation(userId);
    res.status(200).json(allConversation);
  } catch (error) {
    return res.status(500).json({ failed: error.message });
  }
});

router.post('/create', async (req, res) => {
  const menbers = req.body;

  try {
    const newConversaton = await createConversation(menbers);

    res.status(200).json(newConversaton);
  } catch (error) {
    return res.status(500).json({ faill: error.message });
  }
});

module.exports = router;
