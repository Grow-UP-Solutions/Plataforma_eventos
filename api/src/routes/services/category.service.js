import "../../DB.js";
import Category from "../../models/db/Category.js";
import { AllCategoyDb, OneCategoryDb, updateOneCategoryDb } from "../../models/util/functionDB/CategoryDb.js";

export async function getAllCategory() {
  const category = AllCategoyDb();
  return category;
}
export async function getCategory(name) {
  const category = OneCategoryDb(name);
  return category;
}
export async function createCategory(category) {
  const { name } = category;
  const categoryDB = OneCategoryDb(name);
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
