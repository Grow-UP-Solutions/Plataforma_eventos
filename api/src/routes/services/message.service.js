import { findAndUpdateMessage, findMessage, findOneMessage } from "../../models/util/functionDB/messageDb.js";



export async function updateMessage(id, read) {
   try {
    const message = await findOneMessage(id)

    if (!message) {
        throw new Error("el mensaje no existe")        
    }
    const newMessage = await findAndUpdateMessage(id,read)
    return newMessage
   } catch (error) {
     throw new Error(error.message)
   }
   
    

    
}


function name(params) {
  
}