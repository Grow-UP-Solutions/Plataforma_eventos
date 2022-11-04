const {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
  createCategoryDb,
} = require('../../models/util/functionDB/CategoryDb.js');

async function getAllCategory() {
  const category = AllCategoyDb();
  return category;
}
async function getCategory(name) {
  const category = await OneCategoryDb(name);
  return category;
}
async function createCategory(category) {
  try {
    const { name } = category;
    const categoryDB = await OneCategoryDb(name);
    console.log(categoryDB);
    if (!categoryDB) {
      const categories = await createCategoryDb(category);
      return categories;
    }
    return 'La categoria existe';
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}
async function categoryUpdate(id, newCategory) {
  const newCategorys = updateOneCategoryDb(id, newCategory);
  return newCategorys;
}

module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  categoryUpdate,
};
