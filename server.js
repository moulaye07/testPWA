const express = require("express");
const app = express();
const bodyParser = require('body-parser'); //Body parser
const mongoose = require('mongoose')

const cors = require('cors')

app.use(cors());
// ---- THIS IS MIDDLEWARE ----------
app.use(express.static('client'))

//body parsers 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialized routes
app.use('/user', require('./routes/users'))
app.use('/cities', require('./routes/cities'))

//auth
//app.use('/auth', require('./routes/auth-routes'))
app.use('/login', require('./routes/login'))

//error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.mesage })
})

//---- THE END OF MIDDLEWARE ------
const uri = config.mongoDB.uri;
mongoose.connect(uri, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true
});

mongoose.connection
  .once("open", () => {
    console.log("Connected to db");
  })
  .on("error", function (error) {
    console.log("Connection error:", error);
  });

mongoose.Promise = global.Promise;

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app working on ${port}`)
})