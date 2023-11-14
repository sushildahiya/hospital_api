const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
   
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:false
    },
    speciality:{
        type:String,
        required:true
    },
    contact_no:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

const Doctor = mongoose.model('Doctor',doctorSchema)
module.exports=Doctor