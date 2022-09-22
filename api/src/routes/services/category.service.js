import "../../DB.js";
import Category from "../../models/db/Category.js";
import { getAllCategoyDb, getOneCategoryDb, updateOneCategoryDb } from "../../models/util/functionDB/CategoryDb.js";

export async function getAllCategory() {
  const category = getAllCategoyDb();
  return category;
}
export async function getCategory(name) {
  const category = getOneCategoryDb(name);
  return category;
}
export async function createCategory(category) {
  const { name } = category;
  const categoryDB = getOneCategoryDb(name);
  if (categoryDB) {
    console.log("lacategoria existe");
    return "La categoria existe";
  }
  const categories = new Category(category);
  console.log('SEcreo');
  return await categories.save();
}
export async function categoryUpdate(id, newCategory) {
  const newCategorys = updateOneCategoryDb(id, newCategory);


  return newCategorys;
}
