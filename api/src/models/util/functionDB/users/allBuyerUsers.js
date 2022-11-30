const Users = require('../../../db/Users')


module.exports = async function allBuyerUsers(idEvent) {
    return await Users.find({
        myEventsBooked: {$in:[idEvent]}
    })   
}