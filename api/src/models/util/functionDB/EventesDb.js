import Events from "../../db/Events.js";
/**basic user database operations  */
export async function AllEventsDb() {
  return await Events.find()
    .populate({ path: "organizer" })
    .populate({ path: "category" })
    .populate({ path: "opinions" });
}
export async function oneEventDb(params) {
  return (
    (await Events.findOne({ name: params })
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" })) ||
    (await Events.findById(params)
      .populate({ path: "organizer" })
      .populate({ path: "category" })
      .populate({ path: "opinions" }))
  );
}
export async function updateOneEventDb(id, newEvent) {
  return await Events.findByIdAndUpdate({ _id: id }, newEvent, { new: 1 })
    .populate({ path: "organizer" })
    .populate({ path: "category" })
    .populate({ path: "opinions" });
}
export async function deleteOneEventDb(id) {
  return await Events.findByIdAndDelete(id);
}

/**Creating event in Database */

export async function createOneEventDb(event) {
  const eventCreated = new Events(event);
  await eventCreated.save();
  return eventCreated
    .populate({ path: "organizer" })
    .populate({ path: "category" })
    .populate({ path: "opinions" });
}
