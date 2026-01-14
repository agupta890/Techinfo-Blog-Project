const mongoose = require('mongoose')

const URI = `mongodb://127.0.0.1:27017/TechInfo`

const connectDB =async()=>{
    try {
        await mongoose.connect(URI)
        console.log('connection successful')
    } catch (error) {
        console.log('connection failed')
        process.exit(1)
    }
}
module.exports = connectDB