import "../../../DB.js";
import OpinionsEvent from "../../DB/OpinionsEvent.js";
/** basic user database operations */
export async function AllOpinionsEventDb() {
  return await OpinionsEvent.find()
    .populate({ path: "user" })
    .populate({ path: "event" });
}

export async function OneOpinionEventeDb(id) {
  return await OpinionsEvent.findById({ _id: id })
    .populate({ path: "user" })
    .populate({ path: "event" });
}
export async function updateOneOpinionsEventeDb(id, newOpinions) {
  return await OpinionsEvent.findByIdAndUpdate({ _id: id }, newOpinions, {
    new: 1,
  });
}
export async function deleteOneOpinionsEventeDb(id) {
  return await OpinionsEvent.findByIdAndDelete({ _id: id })
    .populate({ path: "user" })
    .populate({ path: "event" });
}
/** create event reviews in the database */
export async function createOpinionsEventeDb(opinions) {
  const opinionsEventCreated = new OpinionsEvent(opinions)
  return await opinionsEventCreated.save()
}
