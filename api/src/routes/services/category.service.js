import {
  AllCategoyDb,
  OneCategoryDb,
  updateOneCategoryDb,
} from "../../models/util/functionDB/CategoryDb.js";

export async function getAllCategory() {
  const category = AllCategoyDb();
  return category;
}
export async function getCategory(name) {
  const category = OneCategoryDb(name);
  return category;
}
export async function createCategory(category) {
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
export async function categoryUpdate(id, newCategory) {
  const newCategorys = updateOneCategoryDb(id, newCategory);

  return newCategorys;
}
