/**
 * Initializing the express router
 */
const express = require('express')
const router = express.Router()
/**
 * Importing doctor controller
 */
const doctorController = require('../controller/api/v1/doctor')

//Route for registering the doctor
router.post('/register',doctorController.createDoctor)
//Route for signing-in doctor
router.post('/sign-in',doctorController.createSession)

//Exporting the router
module.exports=router