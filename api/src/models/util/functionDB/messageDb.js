
import '../../../DB.js'
import Message from "../../db/Message.js";



export async function createMessage(message) {
   const newMessage= new Message(message)

    try {
    return await newMessage.save()
        
    } catch (error) {
        return {ERROR_CREATEMESSAGE: error.message}
    }
    
}

export async function findMessage(conversationId) {
    try {
        console.log(conversationId)
        return await Message.find({
            conversationId: conversationId
        })
    } catch (error) {
        return {ERROR_FINDMESSAGE:error.message}
    }
    
}