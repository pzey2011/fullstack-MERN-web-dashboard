const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serial: { type: String, required: true },
    deviceModel: { type: String, required: true },
    note: { type: String, required: true }
});

module.exports = mongoose.model('Device', deviceSchema);