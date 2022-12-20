require('../../../DB.js');
const Categories = require('../../db/Categories.js');

/** basic user database operations */

async function AllCategoyDb() {
  return await Categories.find();
}

async function OneCategoryDb(name) {
  try {
    return await Categories.findOne({ name: name });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateOneCategoryDb(id, newCategory) {
  return await Categories.findByIdAndUpdate({ _id: id }, newCategory, {
    new: 1,
  });
}
async function deleteOneCategoryDb(id) {
  return await Categories.findByIdAndDelete({ _id: id });
}

/**Creating Categories in Database */
async function createCategoryDb(category) {
  try {
    const categoryCreated = new Categories(category);
   
    return await categoryCreated.save();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
  deleteOneCategoryDb,
  createCategoryDb,
};
