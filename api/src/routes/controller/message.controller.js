import { Router } from "express";
import { createMessage, findMessage } from "../../models/util/functionDB/messageDb.js";




const router = Router()

router.get('/:conversationId', async (req,res)=>{
    const{conversationId}= req.params
    try {
        const allMessage= await findMessage(conversationId)
        res.status(200).json(allMessage)
    } catch (error) {
        return res.status(500).json(error.message)
    }

})

router.post('/create', async (req, res)=>{
    const message =req.body
    try {
        const newMessage= await createMessage(message)
        res.status(200).json(newMessage)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


export default router