//importing the mongoose library
const mongoose = require('mongoose')
/**
 * Defines schema for patient
 */
const patientSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    contact_no:{
        type:Number,
        required:true
    },
    email_address:{
        type:String,
        required:false
    },
    //Mapping the doctor reference to the patient
    doctor:{
        type:String,
        required: true
    },
    temperature:{
        type: Number,
        required: true
    },
    //Reports is an array of object of reports at different time
    reports: [
        {
            status: {
                type: String,
                enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"],
                required: true
            },
            date: {
                type: Date,
                default: new Date()
            }
        }
    ],
}, {
    timestamps: true
}
)

//Mapping Patient to patientSchema
const Patient = mongoose.model('Patient',patientSchema)
//Exporting the Patient mapping
module.exports=Patient