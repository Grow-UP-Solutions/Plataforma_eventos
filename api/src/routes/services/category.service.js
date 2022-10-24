const {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
  createCategoryDb,
} = require("../../models/util/functionDB/CategoryDb.js");

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
    const categoryDB = OneCategoryDb(name);
    if (categoryDB) {
      
      return "La categoria existe";
    }
    const categories = await createCategoryDb(category);
   
    return categories;
  } catch (error) {
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
