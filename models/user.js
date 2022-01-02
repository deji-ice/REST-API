//require mongoose
const mongoose = require("mongoose")

//creating a Schema
const subscriberSchema = new mongoose.Schema({
    // keys and values of subsribers
    name: {
        //defining properties
        type: String,
        required: true
    },
    subbed:{
        type: String,
        required: true
    },
    subbedDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})


// exporting model
module.exports = mongoose.model("Subscribers", subscriberSchema)