const { Router } = require('express');
const PermissionValidator = require('../middlewares/PermissionValidator');
const SessionValidator = require('../middlewares/SessionValidator');
const DeliveryService = require('../services/DeliveryService');
const Controller = require('./Controller');

class UpdateDeliveryController extends Controller {
  constructor() {
    super('put', '/delivery');

    const sessionValidator = new SessionValidator();
    const permissionValidator = new PermissionValidator(['deliveries_write']);

    this.middlewares = [
      sessionValidator.validate.bind(sessionValidator),
      permissionValidator.validate.bind(permissionValidator),
    ];
    this.deliveryService = new DeliveryService();
  }

  async handle(req, res) {
    const { id, data } = req.body;

    const result = await this.deliveryService.updateDelivery(id, data);

    res.status(200).json(result);
  }
}
class ListDeliveriesController extends Controller {
  constructor() {
    super('get', '/deliveries');

    const sessionValidator = new SessionValidator();
    const permissionValidator = new PermissionValidator(['deliveries_read']);

    this.middlewares = [
      sessionValidator.validate.bind(sessionValidator),
      permissionValidator.validate.bind(permissionValidator),
    ];
    this.deliveryService = new DeliveryService();
  }

  async handle(req, res) {
    const { limit = 10, offset = 0 } = req.query;

    const result = await this.deliveryService.getDeliveries(limit, offset);

    res.status(200).json(result);
  }
}

class GetDeliveryController extends Controller {
  constructor() {
    super('get', '/delivery/:id');

    const sessionValidator = new SessionValidator();
    const permissionValidator = new PermissionValidator(['deliveries_read']);

    this.middlewares = [
      sessionValidator.validate.bind(sessionValidator),
      permissionValidator.validate.bind(permissionValidator),
    ];
    this.deliveryService = new DeliveryService();
  }

  async handle(req, res) {
    const { id } = req.params;

    const result = await this.deliveryService.getDelivery(id);

    res.status(200).json(result);
  }
}

const router = Router();
[
  new UpdateDeliveryController(),
  new ListDeliveriesController(),
  new GetDeliveryController(),
].forEach((controller) => {
  router[controller.verb](
    controller.path,
    ...controller.middlewares,
    controller.handle.bind(controller),
  );
});
module.exports = router;
