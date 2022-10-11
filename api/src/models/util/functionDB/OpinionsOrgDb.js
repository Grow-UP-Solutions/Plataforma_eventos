require('../../../DB.js');

const OpinionsOrganizer = require('../../db/OpinionsOrganizer.js');

/** basic user database operations */

async function allOpinionsOrgDb() {
  return await OpinionsOrganizer.find();
}
async function oneOpinionsOrgDb(params) {
  return (
    (await OpinionsOrganizer.findOne({ name: params }).populate('user')) ||
    (await OpinionsOrganizer.findById(params).populate('user'))
  );
}
async function updateOneOpinionsOrgDb(id, newOpinions) {
  return await OpinionsOrganizer.findByIdAndUpdate({ _id: id }, newOpinions, {
    new: 1,
  }).populate('user');
}
async function deleteOneOpinionsOrgDb(id) {
  return await OpinionsOrganizer.findByIdAndDelete(id);
}

module.exports = {
  allOpinionsOrgDb,
  oneOpinionsOrgDb,
  updateOneOpinionsOrgDb,
  deleteOneOpinionsOrgDb,
};
