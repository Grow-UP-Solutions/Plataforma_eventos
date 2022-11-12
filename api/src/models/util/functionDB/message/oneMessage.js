const Message = require("../../../db/Message");

module.exports = async function findOneMessage(idMessage) {
    return await Message.findOne({ _id: idMessage });
 }