const express = require('express')
const app = express()
require('dotenv').config()
const connectDb = require('./config/dbConnection')
const cors = require('cors')

connectDb()

const corsOptions = {
    origin: 'https://taskify-fe-ruby.vercel.app',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors(corsOptions))


app.use('/api/todos', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))



app.listen(process.env.PORT || 8001, ()=>{
    console.log(`Serve is running on Port, ${process.env.PORT}`)
})