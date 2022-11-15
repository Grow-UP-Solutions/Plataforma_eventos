require('../../../../DB')

const UsersFunctionDb = {
  
  oneUser: require('./oneUsers'),
  allUserDb: require('./allUsers'),
  validationEmail: require('./emailUser'),
  updateUsers: require('./updateUsers'),
  deleteUsers: require('./deleteUsers'),
  createUsers: require('./createUsers'),
  sendNotification: require('./sendNotification'),
  readNotification: require('./updateNotification'),
  readAllNotification: require('./readAllNotification'),
  deleteNotification: require('./deleteNotification'),
  updateRating: require('./updateRating'),
  commentUsers: require('./commentUsers'),
  myFavorite: require('./myFavorites'),
};

module.exports = UsersFunctionDb;
