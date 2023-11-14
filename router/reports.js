/**
 * Initializing the express router
 */
const express = require('express')
const router = express.Router()

/**
 * Importing the reports controller
 */
const reportsController = require('../controller/api/v1/reports')

//Route to fetch reports according to status filter
router.get('/:status',reportsController.allReports)

//Exporting the router
module.exports = router