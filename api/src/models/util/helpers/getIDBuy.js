const Order = require('../../db/Order');

const getIDBuy = async () => {
  const allOrders = await Order.find();
  if (allOrders.length === 0) return 1;

  const id = allOrders[allOrders.length - 1].idCompra;
  const newId = +id.split('C')[1] + 1;
  return newId;
};

module.exports = getIDBuy;
