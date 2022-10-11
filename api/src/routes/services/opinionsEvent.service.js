const{
  AllOpinionsEvent,
  createOpinionsEventeDb,
  OneOpinionEvente,
} =require ("../../models/util/functionDB/OpinionsEventDb.js");
const{ OneUserDb } =require ("../../models/util/functionDB/UserDb.js");


 async function getOpiniosEvent() {
  const opinionsEvent = AllOpinionsEvent();

  return opinionsEvent;
}

 async function getOneOpinionsEvent(id) {
  const opinionsEvent = await OneOpinionEvente(id);

  return opinionsEvent;
}

 async function createOpiniosEvent(opinion){
    const {email} = opinion
    
    const user = await OneUserDb(email)

    const newOpinion = await createOpinionsEventeDb(opinion)

    newOpinion.user= user._id
   
    return  await newOpinion.save()
    
}

module.exports={
  getOpiniosEvent,
  getOneOpinionsEvent,
  createOpiniosEvent
}
