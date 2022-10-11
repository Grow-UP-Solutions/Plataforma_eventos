const {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
} = require("../../models/util/functionDB/CategoryDb.js");

async function getAllCategory() {
  const category = AllCategoyDb();
  return category;
}
async function getCategory(name) {
  const category = OneCategoryDb(name);
  return category;
}
async function createCategory(category) {
  try {
    const { name } = category;
    const categoryDB = OneCategoryDb(name);
    if (categoryDB) {
      return "La categoria existe";
    }
    const categories = await createCategory(category);
    console.log("SEcreo");
    return categories;
  } catch (error) {
    console.log("FALLO CATEGORY", error);
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
