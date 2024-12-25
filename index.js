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

const whitelist = [
  process.env.FRONTEND_URL, // Production frontend URL
  'http://localhost:5174',  // Local development frontend
]



const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed methods
    credentials: true, // Allow cookies if needed
    sameSite:'None'
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/auth',authrouter);
app.use('/api/blog',blogrouter);



app.listen(process.env.PORT,()=> console.log('the server is running http://localhost:5000'))