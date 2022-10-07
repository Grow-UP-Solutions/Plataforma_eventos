import '../../../DB.js'
import Conversation from "../../db/Conversation.js";




export async function findAllConversation() {
    try {
        return await Conversation.find()
    } catch (error) {
        return {ERROR_CONVERSATION: error.message}
    }
    
}
export async function findConversation(userId) {
    try {
        return await Conversation.find({
            members:{$in:[userId]}
        })
    } catch (error) {
        return {ERROR_FINDCONVERSATION: error.message}
    }
    
}

export async function createConversation(menbers){
    const {senderId, receiverId}= menbers
   
    try {
        const newConversation= new Conversation({
            members:[senderId,receiverId]
        })
        return await newConversation.save()
    } catch (error) {
        return {ERROR_CONVERSATION: error.message}
    }

}