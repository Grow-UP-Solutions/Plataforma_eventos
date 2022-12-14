const { Router } = require('express');
const EventFunctionDb = require('../../models/util/functionDB/event/index.event.js');
const UsersFunctionDb = require('../../models/util/functionDB/users/index.users.js');
const { sendEmailToReportEvent } = require('../../models/util/mailer/mailToReportEvent.js');
const {
  getAllEvents,
  createEvents,
  eventsUpdate,
  createOpinionsEvents,
  getOneEvent,
} = require('../services/events.services.js');

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

router.get('/:id/buyer', async (req, res) => {
  const { id } = req.params;

  try {
    const buyerEvent = await UsersFunctionDb.allBuyerUsers(id);
    return res.status(200).json(buyerEvent);
  } catch {
    return res.status(500).json({ ERROR_EVENT_BUYER: error.message });
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

router.post('/createAndNotPublic', async (req, res) => {
  try {
    const event = req.body;

    const eventCreat = await createEvents(event);

    eventCreat.isPublic = false;

    eventCreat.dates.forEach((date) => {
      date.isPublic = false;
    });

    await eventCreat.save();

    return res.status(200).json(eventCreat);
  } catch (error) {
    return res.status(500).json({ ERROR_EVENT_CREATE: error.message });
  }
});

router.post('/createAndNotPublic', async (req, res) => {
  try {
    const event = req.body;

    const eventCreat = await createEvents(event);

    eventCreat.isPublic = false;

    eventCreat.dates.forEach((date) => {
      date.isPublic = false;
    });

    await eventCreat.save();

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

router.post('/:idEvent/payment/:idDate', async (req, res) => {
  const { idEvent, idDate } = req.params;
  const { codigoDescuento } = req.query;
  console.log('*/*/', codigoDescuento);
  try {
    const eventSoldOut = await paymentEvents(idEvent, idDate, codigoDescuento);

    return res.status(200).json(eventSoldOut);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

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
    const eventRating = await EventFunctionDb.updateRating(idEvent, rating);
    return res.status(200).json(eventRating);
  } catch (error) {
    return res.status(500).json({ FALLO_UPDATE: error.message });
  }
});

router.put('/reportEvent/sendEmail', async (req, res) => {
  const { dataForReport } = req.body;
  const { dateReport, reasonToReport } = dataForReport;
  const { name, email } = dataForReport.userReport;
  const { title, picture, nameOrganizer, emailOrganizer } = dataForReport.eventReport;

  try {
    if (reasonToReport === '') throw new Error('Ingrese una razón al reporte.');
    await sendEmailToReportEvent(
      dateReport,
      reasonToReport,
      name,
      email,
      title,
      nameOrganizer,
      emailOrganizer,
      picture
    );
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/inRevision/acceptOrReject', async (req, res) => {
  const { idEvent, idDate } = req.body;

  try {
    const event = await EventFunctionDb.oneEvent(idEvent);

    if (idDate) {
      console.log('Entre al if principal');
      if (event.dates.length === 1) {
        event.inRevision = !event.inRevision;
        event.dates[0].inRevision = !event.dates[0].inRevision;
      } else {
        let auxDates = [...event.dates];

        auxDates = auxDates.map((date) => {
          if (idDate === date._id.toString()) {
            console.log('entre al if de fecha');
            date.inRevision = !date.inRevision;
          }
          return date;
        });

        let hasFalse = false;

        for (let x = 0; x < auxDates.length; x++) {
          if (auxDates[x].inRevision === false) hasFalse = true;
        }

        if (hasFalse) event.inRevision = false;
        else event.inRevision = true;

        event.dates = [];
        event.dates.push(...auxDates);
      }
    } else {
      event.inRevision = !event.inRevision;

      let auxDates = [...event.dates];

      auxDates = auxDates.map((date) => {
        date.inRevision = event.inRevision;
        return date;
      });

      event.dates = [];
      event.dates.push(...auxDates);
    }

    event.save();

    res.json({ message: 'Cambio realizado.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
