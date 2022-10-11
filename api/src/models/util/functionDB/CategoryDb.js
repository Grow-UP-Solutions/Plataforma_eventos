require('../../../DB.js');
const Category = require('../../db/Category.js');

/** basic user database operations */

async function AllCategoyDb() {
  return await Category.find();
}

async function OneCategoryDb(name) {
  try {
    return await Category.findOne({ name: name });
  } catch (error) {
    return { message: error.message };
  }
}

async function updateOneCategoryDb(id, newCategory) {
  return await Category.findByIdAndUpdate({ _id: id }, newCategory, {
    new: 1,
  });
}
async function deleteOneCategoryDb(id) {
  return await Category.findByIdAndDelete({ _id: id });
}

/**Creating Category in Database */
async function createCategoryDb(category) {
  const categoryCreated = new Category(category);
  return await categoryCreated.save();
}

module.exports = {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
  deleteOneCategoryDb,
  createCategoryDb,
};
