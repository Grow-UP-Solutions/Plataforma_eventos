const { Router } = require('express');
const EventFunctionDb = require('../../models/util/functionDB/event/index.event.js');
const UsersFunctionDb = require('../../models/util/functionDB/users/index.users.js');
const { sendEmailToReportEvent } = require('../../models/util/mailer/mailToReportEvent.js');

//administrador
const { eventEdited } = require('../../models/util/mailer/Administrador/eventEdited.js');
const { eventInRevisionEditedAdmin } = require('../../models/util/mailer/Administrador/eventInRevisionEditedAdmin.js');

const { eventInRevisionAdmin } = require('../../models/util/mailer/Administrador/eventInRevisionAdmin.js');
const { dateInRevisionAdmin } = require('../../models/util/mailer/Administrador/dateInRevisionAdmin.js');

const { eventCancelAdmin } = require('../../models/util/mailer/Administrador/eventCancelAdmin.js');
const { dateCancelAdmin } = require('../../models/util/mailer/Administrador/dateCancelAdmin.js');

const { eventCreateAdmin } = require('../../models/util/mailer/Administrador/eventCreateAdmin.js');

//organizador
const { dateInRevisionOrg } = require('../../models/util/mailer/Organizador/dateInRevisionOrg.js');
const { eventInRevisionOrg } = require('../../models/util/mailer/Organizador/eventInRevisionOrg.js');
const { eventCreateOrg } = require('../../models/util/mailer/Organizador/eventCreateOrg.js');

//comprador
const { dateCancelBuyers } = require('../../models/util/mailer/Compradores/dateCancelBuyers.js');
const { eventCancelBuyers } = require('../../models/util/mailer/Compradores/eventCancelBuyers.js');

const {
  getAllEvents,
  createEvents,
  eventsUpdate,
  createOpinionsEvents,
  getOneEvent,
} = require('../services/events.services.js');
const getEventId = require('../../models/util/helpers/getIDEvent.js');

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
    const user = await UsersFunctionDb.oneUser(event.idOrganizer);

    event.idEvent = 'E' + (await getEventId());

    for (i = 0; i < event.dates.length; i++) {
      event.dates[i].idDate = event.idEvent + '-' + (i + 1);
    }

    eventCreateOrg(event, user);
    eventCreateAdmin(event, user);

    const eventCreat = await createEvents(event);
    return res.status(200).json(eventCreat);
  } catch (error) {
    return res.status(500).json({ ERROR_EVENT_CREATE: error.message });
  }
});

router.post('/createAndNotPublic', async (req, res) => {
  try {
    const event = req.body;

    event.idEvent = 'E' + (await getEventId());

    for (i = 0; i < event.dates.length; i++) {
      event.dates[i].idDate = event.idEvent + '-' + (i + 1);
    }

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
    const user = await UsersFunctionDb.oneUser(newEvent.idOrganizer);
    const event = await getOneEvent(id);

    //mails para avisar evento/fecha cancelado(sacado de publico)

    if (newEvent.dates.length === 1) {
      newEvent.dates[0].sendEmail === true ? eventCancelBuyers(event) : '';
      newEvent.dates[0].sendEmail === true ? eventCancelAdmin(event, user) : '';
    } else {
      for (let i = 0; i < newEvent.dates.length; i++) {
        newEvent.dates[i].sendEmail === true ? dateCancelBuyers(event, newEvent.dates[i]) : '';
        newEvent.dates[i].sendEmail === true ? dateCancelAdmin(event, user, newEvent.dates[i]) : '';
      }
    }

    //mails para avisar evento/fecha cancelado(eliminado)

    if (newEvent.dateDelete.length) {
      for (let i = 0; i < newEvent.dateDelete.length; i++) {
        dateCancelBuyers(event, newEvent.dateDelete[i]);
        dateCancelAdmin(event, user, newEvent.dateDelete[i]);
      }
    }

    //mails para avisar evento editado
    if (newEvent.inRevision === false && newEvent.isEdit === true) {
      eventEdited(newEvent, user);
    } else if (newEvent.inRevision === true && newEvent.isEdit === true) {
      eventInRevisionEditedAdmin(newEvent, user, event);
    }

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
    console.log('event.organizer', event.organizer);
    const user = await UsersFunctionDb.oneUser(event.organizer);

    if (idDate) {
      if (event.dates.length === 1) {
        event.inRevision === false && event.sells > 0 ? eventCancelBuyers(event, user) : '';
        event.inRevision === false ? eventInRevisionAdmin(event, user) : '';
        event.inRevision === false ? eventInRevisionOrg(event, user) : '';
        event.inRevision = !event.inRevision;
        event.dates[0].inRevision = !event.dates[0].inRevision;
      } else {
        let auxDates = [...event.dates];

        auxDates = auxDates.map((date) => {
          if (idDate === date._id.toString()) {
            date.inRevision === false && date.sells > 0 ? dateCancelBuyers(event, date) : '';
            date.inRevision === false ? dateInRevisionAdmin(event, user, date) : '';
            date.inRevision === false ? dateInRevisionOrg(event, user, date) : '';
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
      event.inRevision === false && event.sells > 0 ? eventCancelBuyers(event) : '';
      event.inRevision === false ? eventInRevisionAdmin(event, user) : '';
      event.inRevision === false ? eventInRevisionOrg(event, user) : '';
      event.inRevision = !event.inRevision;
      event.inRevision === false ? event.isPublic === false : event.isPublic === event.isPublic;

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
