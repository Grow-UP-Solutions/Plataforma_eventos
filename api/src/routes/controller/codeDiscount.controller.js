const router = require('express').Router();

const {
  createCodeDiscount,
  deleteCodeDiscountById,
  getAllCodeDiscount,
  getCodeDiscountById,
  updateCodeDiscount,
  getListCodeDiscountByCreator,
} = require('../../models/util/functionDB/CodeDiscountDb');

router.post('/createCodeDiscount', async (req, res) => {
  const { data } = req.body;
  try {
    const newCodeDiscount = await createCodeDiscount(data);
    res.json({ newCodeDiscount });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.get('/getAllCodeDiscount/', async (req, res) => {
  try {
    const allCodeDiscount = await getAllCodeDiscount();
    res.status(200).json({ allCodeDiscount });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/getCodeDiscountById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const codeDiscount = await getCodeDiscountById(id);
    res.status(200).json({ codeDiscount });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/getListCodeDiscountByCreator/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listCodeDiscount = await getListCodeDiscountByCreator(id);
    res.json({ listCodeDiscount });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.put('/updateCodeDiscount/:id', async (req, res) => {
  const { id } = req.params;
  const { value, percentage, quotas } = req.body;

  try {
    await updateCodeDiscount(id, value, percentage, quotas);
    res.json({ success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete('/deleteCodeDiscountById/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCodeDiscountById(id);
    res.json({ success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
