import { Router } from "express";
import { oneEventDb } from "../../models/util/functionDB/EventesDb.js";

import { getAllEvents, createEvents, eventsUpdate, createOpinionsEvents, getOneEvent } from "../services/events.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allEvents = await getAllEvents();

    return res.status(200).json(allEvents);

  } catch (error) {

    return res.status(500).json({ ERROR_EVENTS: error.message });
  }
});
router.get('/:id', async (req, res)=>{
  const {id }=req.params
  try {
    const event = await getOneEvent(id)
   res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

router.post("/create", async (req, res) => {
  try {
    
    const event = req.body;

    const eventCreat = await createEvents(event);

    return res.status(200).json(eventCreat);
  } catch (error) {
    return res.status(500).json({ ERROR_EVENT_CREATE: error.message });
  }
});

router.post('/opinionsGenerate/:id', async (req,res) => {
  try {
    const {id} = req.params
    const comments = req.body
    const createOpinions = await createOpinionsEvents(id,comments)
    return res.status(200).json(createOpinions)
  } catch (error) {
    res.status(500).json(error.message)
    
  }
})

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    
    const newEvent = req.body;
   
    const newEvente = await eventsUpdate(id, newEvent);

    return res.json(newEvente);

  } catch (error) {
    return res.status(500).json({ FALLO_UPDATE: error.message });
  }
});

export default router;
