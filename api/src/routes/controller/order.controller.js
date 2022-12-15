const { Router } = require('express');
const Order = require('../../models/db/Order');
const router = Router();


router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find().lean();
    res.json(allOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
