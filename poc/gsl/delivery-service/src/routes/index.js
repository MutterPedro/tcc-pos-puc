const { Router } = require('express');
const deliveryController = require('./DeliveryController');

const router = Router();

router.use(deliveryController);

module.exports = router;
