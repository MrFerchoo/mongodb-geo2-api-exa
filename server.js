const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./api/users');
const cors = require('cors');


var fs = require('fs');
var https = require('https');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/users', User);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


var privateKey  = fs.readFileSync('./sslcerts/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('./sslcerts/selfsigned.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(cors());

var httpsServer = https.createServer(credentials, app);

mongoose.connect(
  "mongodb://127.0.0.1/examen2p",
  { useNewUrlParser: true }
).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
          app.listen(4000, ()=>{
              console.log('Server running on http://172.18.70.104:4000');
          });

          httpsServer.listen(5176, ()=>{
            console.log('Server running on https://172.18.70.104:5176');
          });
  },
  err => { /** handle initial connection error */ 
          err & console.log(err) & console.log('Error connecting to db');
  }
);