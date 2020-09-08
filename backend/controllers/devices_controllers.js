const mongoose = require('mongoose');
const Device = require('../models/device');
const getDeviceById = async (req, res, next) => {
  const deviceId = req.params.id;
  let devices;
  devices = await Device.find().exec();
  res.json(devices[deviceId]);
};
const getAllDevices = async (req, res, next) => {
    let devices =[];
    devices = await Device.find().exec();
    
    res.json(devices);
  };

const createDevice = async (req, res, next) => {
  const { name, serial, deviceModel, note } = req.body;
  const createdDevice = new Device({
    name,
    serial,
    deviceModel,
    note
  });
  
  try {
    await createdDevice.save(); 
  } catch (err) {
    return next('Creating place failed, please try again.');
  }

  res.json({ device: createdDevice });
};

const updateDevice = async (req, res, next) => {

  const { name, note } = req.body;
  const deviceId = req.params.id;
  let devices = [];
  let device;
  try {
    devices = await Device.find().exec();
    device = devices[deviceId];
  } catch (err) {
    return next('Something went wrong, could not update place.');
  }

  device.name = name;
  device.note = note;

  try {
    await device.save();
  } catch (err) {
    
    return next('Something went wrong, could not update place.');
  }

  res.status(200).json({ device });
};

const deleteDevice = async (req, res, next) => {
  const deviceId = req.params.id;
  
  let devices = [];
  let device;
  try {
    devices = await Device.find().exec();
    device = devices[deviceId];
    
  } catch (err) {
    return next('Something went wrong, could not delete place.');
  }

  if (!device) {
    
    return next('Could not find place for this id.');
  }
  try {
    await device.remove();
  } catch (err) {
    return next('Something went wrong, could not delete place.');
  }

  
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getDeviceById = getDeviceById;
exports.getAllDevices = getAllDevices;
exports.createDevice = createDevice;
exports.updateDevice = updateDevice;
exports.deleteDevice = deleteDevice;
