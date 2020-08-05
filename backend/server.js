const express = require('express');
const bodyParser = require('body-parser')
const deviceRoutes = require('./routes/device-routes')


const app = express();
app.use(bodyParser.json());
app.use('/api/devices', deviceRoutes); 
app.listen(5000);