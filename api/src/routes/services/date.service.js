require('../../DB.js')
const Date= require('../../models/db/Date.js')


module.exports={
    getAllDate: async ()=>{
        const allDate= await Date.find()
        return allDate
    },

    createDate: async (date)=>{
        const dateCreate =  Date(date)
        return await dateCreate.save()

    }
}