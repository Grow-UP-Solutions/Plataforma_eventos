import {
  AllOpinionsEvent,
  createOpinionsEventeDb,
  OneOpinionEvente,
} from "../../models/util/functionDB/OpinionsEventDb.js";
import { OneUserDb } from "../../models/util/functionDB/UserDb.js";


export async function getOpiniosEvent() {
  const opinionsEvent = AllOpinionsEvent();

  return opinionsEvent;
}

export async function getOneOpinionsEvent(id) {
  const opinionsEvent = await OneOpinionEvente(id);

  return opinionsEvent;
}

export async function createOpiniosEvent(opinion){
    const {email} = opinion
    
    const user = await OneUserDb(email)

    const newOpinion = await createOpinionsEventeDb(opinion)

    newOpinion.user= user._id
   
    return  await newOpinion.save()
    
}
