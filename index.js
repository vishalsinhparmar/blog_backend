require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authrouter = require('./src/routes/authRouter.js');
const blogrouter = require('./src/routes/blogroute.js')
const cors = require('cors')

app.use('/uploads',express.static('uploads'));
mongoose.connect('mongodb://localhost:27017/UserData')
.then(()=> console.log('the dataBase is connected'))
.catch((err)=>console.log(err))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/auth',authrouter);
app.use('/api/blog',blogrouter);



app.listen(5000,()=> console.log('the server is running http://localhost:5000'))