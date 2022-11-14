const Message = require('../../../db/Message');

module.exports = async function allMessageDB() {
  return await Message.find();
};
