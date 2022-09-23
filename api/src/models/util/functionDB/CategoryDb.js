import "../../../DB.js";
import Category from "../../db/Category.js";

/** basic user database operations */

export async function AllCategoyDb() {
  return await Category.find();
}

export async function OneCategoryDb(name) {
  console.log("category", name);
  return await Category.findOne({ name: name });
}

export async function updateOneCategoryDb(id, newCategory) {
  return await Category.findByIdAndUpdate({ _id: id }, newCategory, {
    new: 1,
  });
}
export async function deleteOneCategoryDb(id) {
  return await Category.findByIdAndDelete({ _id: id });
}

/**Creating Category in Database */
export async function createCategoryDb(category) {
  const categoryCreated = new Category(category);
  return await categoryCreated.save();
}
