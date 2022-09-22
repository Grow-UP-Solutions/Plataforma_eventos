import "../../../DB.js"
import Category from "../../db/Category.js";


/** funciones para operaciones en base de datos usuario */

export async function getAllCategoyDb () {
    return await Category.find();
  }
  
  export async function getOneCategoryDb (name) {
    console.log("category", name);
    return await Category.findOne({ name: name });
  }

  export async function updateOneCategoryDb (id, newCategory) {
    return await Category.findByIdAndUpdate({ _id: id }, newCategory, {
      new: 1,
    });
  }
  export async function deleteOneCategoryDb (id) {
    return await Category.findByIdAndDelete({ _id: id });
  }

