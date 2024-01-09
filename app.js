const express = require('express')
const app = express()
require('dotenv').config()
const connectDb = require('./config/dbConnection')
const cors = require('cors')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
 }))



app.use('/api/todos', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


connectDb()
app.listen(process.env.PORT || 8001, ()=>{
    console.log(`Serve is running on Port, ${process.env.PORT}`)
})