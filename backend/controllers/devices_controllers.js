const mongoose = require('mongoose');
const Device = require('../models/device');
const getDeviceById = async (req, res, next) => {
  const deviceId = req.params.id;
  console.log(req.params);
  let devices;
  devices = await Device.find().exec();
  console.log(devices[deviceId]);
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

  res.json({ place: createdPlace });
};

const updateDevice = async (req, res, next) => {

  const { deviceModel, note } = req.body;
  const deviceId = req.params.id;

  let device;
  try {
    device = await Device.findById(deviceId);
  } catch (err) {
    return next('Something went wrong, could not update place.');
  }

  device.deviceModel = deviceModel;
  device.note = note;

  try {
    await device.save();
  } catch (err) {
    
    return next('Something went wrong, could not update place.');
  }

  res.status(200).json({ place });
};

const deleteDevice = async (req, res, next) => {
  const deviceId = req.params.id;

  let device;
  try {
    device = await Device.findById(deviceId);
  } catch (err) {
    
    return next('Something went wrong, could not delete place.');
  }

  if (!device) {
    
    return next('Could not find place for this id.');
  }

  try {
    await device.remove();
    place.creator.places.pull(place);
    await device.save();
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
