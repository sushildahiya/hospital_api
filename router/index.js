/**
 * Initializing the express router
 */
const express = require('express')
const router = express.Router()

/**
 * Using doctors route defined in separate js file
 */
router.use("/doctors",require('./doctors'))
/**
 * Using patients route defined in separate js file
 */
router.use("/patients",require('./patients'))
/**
 * Using reports route defined in separate js file
 */
router.use("/reports",require('./reports'))

//Exporting the router
module.exports = router;