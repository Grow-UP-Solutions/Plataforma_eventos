function outstanding(id, arr) {
   const messageOustanding = arr.find((e) => e.idUser === id);
   return (messageOustanding.isOutstanding = !messageOustanding.isOutstanding);
}

module.exports = outstanding;
