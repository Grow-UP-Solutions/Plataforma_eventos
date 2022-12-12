const eventDateToCalendarFormat = (userDates) => {
  let created = [];

  if (userDates.isOrganizer) {
    for (let x = 0; x < userDates.myEventsCreated.length; x++) {
      for (let j = 0; j < userDates.myEventsCreated[x].dates.length; j++) {
        if (userDates.myEventsCreated[x].dates[j].isPublic) created.push(userDates.myEventsCreated[x].dates[j]);
      }
    }
  }

  let pendingToAssist = [];

  if (userDates.myEventsBooked) {
    for (let x = 0; x < userDates.myEventsBooked.length; x++) {
      for (let j = 0; j < userDates.myEventsBooked[x].dates.length; j++) {
        if (userDates.myEventsBooked[x].dates[j].isPublic) pendingToAssist.push(userDates.myEventsBooked[x].dates[j]);
      }
    }
  }

  if (created.length > 0) {
    created = created.map((date) => {
      const datesData = date.date.split('-');

      const year = +datesData[0];
      const month = +datesData[1][0] === 0 ? +datesData[1][1] : +datesData[1];
      const day = +datesData[2][0] === 0 ? +datesData[2][1] : +datesData[2];

      return { year, month, day, className: 'blueDay' };
    });
  }

  if (pendingToAssist.length > 0) {
    pendingToAssist = pendingToAssist.map((date) => {
      const datesData = date.date.split('-');

      const year = +datesData[0];
      const month = +datesData[1][0] === 0 ? +datesData[1][1] : +datesData[1];
      const day = +datesData[2][0] === 0 ? +datesData[2][1] : +datesData[2];

      return { year, month, day, className: 'orangeDay' };
    });
  }

  const totalDatesToCalendar = [...created, ...pendingToAssist];

  return totalDatesToCalendar;
};

export default eventDateToCalendarFormat;

/* Noviembre 23 - Makano */
/* 
    Diciembre 18  - Cartagena
    Diciembre 19 
*/

/* Diciembre 23 - Mundial */
