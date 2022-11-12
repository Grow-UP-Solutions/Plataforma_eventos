const { Router } = require("express");
const MessageFunctionDb = require("../../models/util/functionDB/message/index.message.js");
const { updateMessage } = require("../services/message.service.js");

const router = Router();

router.get("/", async (req, res) => {
   try {
      const allMessage = await MessageFunctionDb.allMessage();
      return res.status(200).json(allMessage);
   } catch (error) {
      return res.status(500).json(error.message);
   }
});

router.get("/:conversationId", async (req, res) => {
   const { conversationId } = req.params;
   try {
      const allMessage = await MessageFunctionDb.findMessage(conversationId);
      res.status(200).json(allMessage);
   } catch (error) {
      return res.status(500).json(error.message);
   }
});

router.post("/create", async (req, res) => {
   const message = req.body;
   try {
      const newMessage = await MessageFunctionDb.createMessage(message);
      res.status(200).json(newMessage);
   } catch (error) {
      return res.status(500).json(error.message);
   }
});

router.put("/:idMessage/outstanding", async (req, res) => {
   const { idMessage } = req.params;
   const {idUser} = req.body;
   try {
      const messageOutstanding = await MessageFunctionDb.outstanding(idMessage, idUser);
      return res.status(200).json(messageOutstanding);
   } catch (error) {
      return res.status(500).json(error.message);
   }
});

router.put("/update/:id", async (req, res) => {
   const { id } = req.params;
   const { conversationId } = req.body;

   try {
      const newMessage = await updateMessage(id, conversationId);
      res.status(200).json(newMessage);
   } catch (error) {
      res.status(500).json(error.message);
   }
});

module.exports = router;
