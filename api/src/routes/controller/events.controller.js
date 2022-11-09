const { Router } = require('express');
const { oneEventDb, updateEventRating } = require('../../models/util/functionDB/EventesDb.js');

const {
  getAllEvents,
  createEvents,
  eventsUpdate,
  createOpinionsEvents,
  getOneEvent,
} = require('../services/events.services.js');
const paymentEvents = require('../services/pasarelaPagoService/paymentEvents.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allEvents = await getAllEvents();

    return res.status(200).json(allEvents);
  } catch (error) {
    return res.status(500).json({ ERROR_EVENTS: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await getOneEvent(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/create', async (req, res) => {
  try {
    const event = req.body;

    const eventCreat = await createEvents(event);

    return res.status(200).json(eventCreat);
  } catch (error) {
    return res.status(500).json({ ERROR_EVENT_CREATE: error.message });
  }
});

router.post('/opinionsGenerate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = req.body;
    const createOpinions = await createOpinionsEvents(id, comments);
    return res.status(200).json(createOpinions);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post('/:idEvent/payment/:idDate', async (req,res)=>{
  const {idEvent, idDate}= req.params
  const {codigoDescuento } = req.query
  console.log('*/*/',codigoDescuento)
  try {
    const eventSoldOut = await paymentEvents(idEvent, idDate, codigoDescuento)

    return res.status(200).json(eventSoldOut)

  } catch (error) {
    res.status(500).json(error.message);
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const newEvent = req.body;

    const newEvente = await eventsUpdate(id, newEvent);

    return res.json(newEvente);
  } catch (error) {
    return res.status(500).json({ FALLO_UPDATE: error.message });
  }
});

router.put('/:idEvent/rating', async (req, res) => {
  const { idEvent } = req.params;
  const { rating } = req.body;
  try {
    const eventRating = await updateEventRating(idEvent, rating);
    return res.status(200).json(eventRating);
  } catch (error) {
    return res.status(500).json({ FALLO_UPDATE: error.message });
  }
});

module.exports = router;
