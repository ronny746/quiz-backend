var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
const app = express();

const userroute = require('./routes/user_route');
const quizroute = require('./routes/quiz_route');

app.get('/about', (req, res) => {
    res.send('This is my about route..... ')
  })

mongoose.connect('mongodb+srv://rohit:rana@cluster0.btddseq.mongodb.net/quiz_dashboard?retryWrites=true&w=majority',
{useUnifiedTopology: true,useNewUrlParser: true},
).then(() => app.listen(3000)
).then(() => console.log("connected to Database and running on port 3000")
);
app.use(express.json());
app.use("/api",userroute);
app.use("/api",quizroute);

module.exports = app