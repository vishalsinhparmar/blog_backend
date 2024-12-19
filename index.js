require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authrouter = require('./src/routes/authRouter.js');
const blogrouter = require('./src/routes/blogroute.js')
const cors = require('cors')

app.use('/uploads',express.static('uploads'));
mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=> console.log('the dataBase is connected'))
.catch((err)=>console.log(err.message))
const corsOptions = {
    origin: [process.env.FRONTEND_URL], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed methods
    credentials: true, // Allow cookies if needed
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/auth',authrouter);
app.use('/api/blog',blogrouter);



app.listen(process.env.PORT,()=> console.log('the server is running http://localhost:5000'))