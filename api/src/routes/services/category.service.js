require("../../DB");
const Category = require("../../models/db/Category");

module.exports = {
  getCategory: async function () {
    const category = await Category.find();
    return category;
  },
  createCategory: async function (category) {
    const { name } = category;
    const categoryDB = await Category.findOne({ name: name });
    if (categoryDB) {
      console.log("lacategoria existe");
      return "La categoria existe";
    }   
    const categories = new Category(category);
    console.log('SEcreo')
    return await categories.save();
  },
  categoryUpdate: async function (id, newCategory) {
    const newCategorys = await Category.findByIdAndUpdate(
      { _id: id },
      newCategory,
      {
        new: 1,
      }
    );

    return newUsers;
  },
};
