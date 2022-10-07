
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
        
        return await Message.find({
            conversationId: conversationId
        })
    } catch (error) {
        return {ERROR_FINDMESSAGE:error.message}
    }
    
}
export async function findOneMessage(id) {

    console.log(id)
    return await Message.findOne({_id:id})
    
}

export async function findAndUpdateMessage(id, read){
    try {
        const newMessage = await findOneMessage(id)
        newMessage.read = read
        return await newMessage.save()
    } catch (error) {
        return {ERROR_UPDATEMESSAGE:error.message}
    }

}