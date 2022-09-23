import {
  AllOpinionsEvent,
  OneOpinionEvente,
} from "../../models/util/functionDB/OpinionsEventDb.js";

export async function getOpiniosEvent() {
  const opinionsEvent = AllOpinionsEvent();

  return opinionsEvent;
}

export async function getOneOpinionsEvent(id) {
  const opinionsEvent = await OneOpinionEvente(id);

  return opinionsEvent;
}

export async function createOpiniosEvent(opinion){
    
    
}
