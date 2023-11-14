/**
 * Initializing and importing the express framework
 */
const express = require('express')
const app = express()
/**
 * Port on which server will run
 */
const port =8000
/** 
 * Importing the body parser
*/
const bodyParser = require('body-parser')
/**
 * Importing defined mongoose configuration
 */
const db = require('./config/mongoose');

/**
 * Initializing boady-parser middleware 
 */
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

/**
 * Using defined express router
 */
app.use('/',require('./router'))

/**
 * Listening server on the port 
 */
app.listen(port, (err)=>{
    if(err){
        console.log('Error running the server')
        return
    }
    console.log(`Server running on port ${port}`)
})