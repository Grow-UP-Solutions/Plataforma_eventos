const { Router } = require('express');
const {
  createConversation,
  findAllConversation,
  findConversation,
  allConversationDB,
  lockedConversation,
  pinupConversation,
  createConversationAllBuyer,
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

router.post('/buyer/create', async (req, res) => {
  const menbers = req.body;

  try {
    const newConversaton = await createConversationAllBuyer(menbers);

    res.status(200).json(newConversaton);
  } catch (error) {
    return res.status(500).json({ faill: error.message });
  }
});

router.put('/:idConversation', async (req, res)=>{
const {idConversation} = req.params
  try {
    const lockConversation = await lockedConversation(idConversation)
    return res.status(200).json(lockConversation)
  } catch (error) {
    return res.status(500).json({ faill: error.message });
  }
})
router.put('/:idConversation/pinup', async (req, res)=>{
const {idConversation} = req.params
console.log(idConversation)
  try {
    const pinupConversations = await pinupConversation(idConversation)
    return res.status(200).json(pinupConversations)
  } catch (error) {
    return res.status(500).json({ faill: error.message });
  }
})

module.exports = router;
