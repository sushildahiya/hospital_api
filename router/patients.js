/**
 * Initializing the express router
 */
const express = require('express')
const router = express.Router()
/**
 * Importing patient controller and passport config file
 */
const patientController = require('../controller/api/v1/patient')
const passport = require('../config/passport-JWT-stratergy')

//Route for registering the patient
router.post('/register', passport.authenticate('jwt', { session: false }), patientController.registerPatient);

//Route for creating the report for the patient
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patientController.createReport);

//Route to view all the reports of patient (oldest to newest)
router.get('/:id/all_reports',passport.authenticate('jwt',{session:false}),patientController.getAllReportOfPatient)

//Exporting the router
module.exports=router