require('../../DB')
const Category = require('../../models/db/Category')


module.exports={
    getCategory: async function(){
        const category = await Category.find()
        return category
    },
    createCategory: async function(category) {
        const categories = Category.create(category)
        return (await categories).save()
    }
}