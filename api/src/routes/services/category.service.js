const {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
  createCategoryDb,
  deleteOneCategoryDb,
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

async function deleteCategory(id) {
  const category = await deleteOneCategoryDb(id);
  return category;
}

module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  categoryUpdate,
  deleteCategory,
};
