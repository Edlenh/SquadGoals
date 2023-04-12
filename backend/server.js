//require dotenv files for environment variables
require('dotenv').config()
var cors = require('cors');
//set up app and require routes
const express = require('express')
const userRoutes = require('./routes/user_routes')
const goalRoutes = require('./routes/goal_routes')
const quoteRoutes = require('./routes/quote_route')
const mongoose = require('mongoose')


const app = express();

//set up PORT
const PORT= process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//set up routes
app.use('/api/user', userRoutes)
app.use('/api/goal', goalRoutes)
app.use('/api/quote', quoteRoutes)
//fire up server
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Connected to DB and listening to port at http://localhost:${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
});