const eventDateToCalendarFormat = (userDates) => {
  let created = userDates.myEventsCreated
    .map((event) => {
      return event.dates.map((date) => {
        if (date.isPublic) return date;
      });
    })
    .flat();

  let pendingToAssist = userDates.myEventsBooked
    .map((event) => {
      return event.dates.map((date) => {
        if (date.isPublic) return date;
      });
    })
    .flat();

  created = created.map((date) => {
    const datesData = date.date.split('-');

    const year = +datesData[0];
    const month = +datesData[1][0] === 0 ? +datesData[1][1] : +datesData[1];
    const day = +datesData[2][0] === 0 ? +datesData[2][1] : +datesData[2];

    return { year, month, day, className: 'blueDay' };
  });

  pendingToAssist = pendingToAssist.map((date) => {
    const datesData = date.date.split('-');

    const year = +datesData[0];
    const month = +datesData[1].length === 2 ? +datesData[1][1] : +datesData[1];
    const day = +datesData[2].length === 2 ? +datesData[2][1] : +datesData[2];

    return { year, month, day, className: 'orangeDay' };
  });

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
