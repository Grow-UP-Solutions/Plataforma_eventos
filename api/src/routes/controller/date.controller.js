const { Router }= require('express')
const { getAllDate, createDate } = require('../services/date.service')

const router = Router()

router.get('/', async(req ,res)=>{
    const allDate = await getAllDate()
    return res.json(allDate)
})

router.post('/create', async (req,res)=>{
    const date = req.body
    const dateCreate= await createDate(date)
    return res.json(dateCreate)
})

module.exports= router