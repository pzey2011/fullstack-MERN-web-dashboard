const express = require('express');
const bodyParser = require('body-parser')
const deviceRoutes = require('./routes/device-routes')
const Device = require('./models/device');

const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
app.use('/api/devices', deviceRoutes); 
mongoose.connect(
    'mongodb+srv://peyman:B1TX27Ywea2dmcXy@cluster0.uvdgg.mongodb.net/mern_devices_db?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true }
  ).then(() => {
      console.log('Connected to database!')
  }).catch(() => {
      console.log('Connection failed!')
  });


app.listen(5000);