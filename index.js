const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routers/user.route');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/userdetails').then(()=>{
    console.log("DB Connected successfully ")
}).catch(e => console.log(e.message));

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/users',userRouter);
app.listen(4000,()=>{
    console.log("server is running on 4000");
})