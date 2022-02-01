const DeliveryRepository = require('../repositories/DeliveryRepository');

class DeliveryService {
  constructor() {
    this.deliveryRepository = new DeliveryRepository();
  }

  async updateDelivery(id, data) {
    return this.deliveryRepository.updateById(id, data);
  }

  async getDelivery(id) {
    return this.deliveryRepository.getById(id);
  }

  async getDeliveries(limit, offset) {
    return this.deliveryRepository.getAll(limit, offset);
  }
}

module.exports = DeliveryService;
