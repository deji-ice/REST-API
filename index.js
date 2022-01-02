const path = require('path');
//required my .env file which contains the Database Url
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });
const express = require('express')
const app = express()
const mongoose = require("mongoose")

//mongoose connection to .env file storing database uri 
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
// if theres an error
db.on('error', (error)=> console.log(error))
// if connected successfully
db.once('open', ()=> console.log("connected to db"))

//lets our server accept json as  body
app.use(express.json())

//route all our subscribers informations
const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)

//listening to the server when started
app.listen(3000, ()=> console.log("server has started"))