const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minlength:4
    },
    
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    message:{
        type:String,
        required:true,
        minlength:10
    }

})

const contactModel = mongoose.model("Contact",contactSchema)

module.exports = contactModel;