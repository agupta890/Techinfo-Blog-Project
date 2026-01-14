const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
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

    password:{
        type:String,
        required:true,
        minlength:6,
        
    },

    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    }
    
},{ timestamps: true }
)


const userModel = mongoose.model('user',userSchema)

module.exports = userModel