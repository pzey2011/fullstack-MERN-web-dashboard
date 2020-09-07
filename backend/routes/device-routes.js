const express = require('express');
const router = express.Router();
const devicesControllers = require('../controllers/devices_controllers');
const DEVICES = {
    "@id": "/devices",
    "@type": "Collection",
    "totalItems": "2" ,
    "member": [{
    "@type": "Device",
    "@id": "/devices/id1",
    "serial": "ABC-123",
    "name": "My Pressure Sensor",
    "deviceModel": "/devicemodels/id1",
    "note": "A device for monitoring air pressure.",
    "owner": "/users/id1",
    "subscription": "/subscriptions/id1"
    },
    {
    "@type": "Device",
    "@id": "/devices/id2",
    "serial": "EFG-321",
    "name": "My Level Sensor",
    "deviceModel": "/devicemodels/id2",
    "note": "A device for monitoring water level.",
    "owner": "/users/id1",
    "subscription": "/subscriptions/id1",
    }
    ],
    "view": {
    "@id": "/devices?page=1",
    "@type": "PartialCollectionView",
    "first": "/devices?page=1",
    "previous": "/devices?page=1",
    "next": "/devices?page=1",
    "last": "/devices?page=1"
    }
};
router.get('/',devicesControllers.getAllDevices);
router.post('/create',devicesControllers.createDevice);
router.get('/:id', devicesControllers.getDeviceById);
router.patch('/:id', devicesControllers.updateDevice);
router.delete('/:id', devicesControllers.deleteDevice);
module.exports = router;