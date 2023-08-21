var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const app = express();
app.use(express.json());
const userroute = require('./routes/user_route');
const quizroute = require('./routes/quiz_route');

app.use("/api",userroute);
app.use("/api",quizroute);

mongoose.connect('mongodb+srv://rohit:rana@cluster0.btddseq.mongodb.net/quiz_dashboard?retryWrites=true&w=majority',
{useUnifiedTopology: true,useNewUrlParser: true},
).then(() => app.listen(3000)
).then(() => console.log("connected to Database and running on port 3000")
);