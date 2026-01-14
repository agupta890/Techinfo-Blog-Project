require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/auth-routers')
const blogRouter = require('./routers/blog-router')
const adminRouter = require('./routers/admin-router')
const connectDB = require('./utils/connection')
const contactRouter = require('./routers/contact-router')
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

app.use('/api/auth',authRouter)
app.use('/api',blogRouter)
app.use('/api',adminRouter)
app.use('/api',contactRouter)

//server port and connection
const port =process.env.port || 3000
connectDB().then(()=>{
  app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})  
})
