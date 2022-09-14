const { Router}=require('express')
const { getCategory, createCategory } = require("../services/category.service");


const router =Router()




router.get("/", async (req, res) => {
    const allCategory = await getCategory();
    return res.json(allCategory);
  });
  
  router.post('/create',async (req,res)=>{
    const category = req.body
    const categoryCreat= await createCategory(category)
    return res.json(categoryCreat)
  })

  module.exports=router