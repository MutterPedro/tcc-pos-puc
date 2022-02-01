const Repository = require('./Repository');
const deliveries = require('../db/deliveries.json');
const Delivery = require('../entities/Delivery');
const Order = require('../entities/Order');
const Path = require('../entities/Path');
const User = require('../entities/User');
const Item = require('../entities/Item');

const sgeWrapper = {
  findOne(id) {
    return deliveries.find((d) => d.id === id);
  },
  findOneIndex(id) {
    return deliveries.findIndex((d) => d.id === id);
  },
  find(_limit, _offset) {
    return {
      data: deliveries,
      total: deliveries.length,
    };
  },
};

module.exports = class DeliveryRepository extends Repository {
  constructor() {
    super(sgeWrapper);
  }

  fromRawData(rawDelivery) {
    return new Delivery({
      id: rawDelivery.id,
      status: rawDelivery.status,
      order: new Order({
        id: rawDelivery.order.id,
        createdAt: rawDelivery.order.createdAt,
        updatedAt: rawDelivery.order.updatedAt,
        user: new User({ name: rawDelivery.order.user.name }),
        items: rawDelivery.order.items.map((item) => new Item(item)),
      }),
      paths: rawDelivery.paths.map(
        (path) =>
          new Path({ ...path, responsible: new User(path.responsible) }),
      ),
    });
  }

  async getById(id) {
    const rawDelivery = await this.dao.findOne(id);
    if (rawDelivery) {
      const delivery = this.fromRawData(rawDelivery);

      return delivery;
    }
  }

  async getAll() {
    const { total, data } = this.dao.find();

    return {
      total,
      data: data.map(this.fromRawData),
    };
  }

  async updateById(id, { status, path }) {
    const idx = await this.dao.findOneIndex(id);
    const rawDelivery = deliveries[idx];
    if (rawDelivery) {
      rawDelivery.status = status;

      deliveries[idx].paths[rawDelivery.paths.length - 1].arrivedAt =
        new Date().toISOString();
      path.leftAt = new Date().toISOString();

      deliveries[idx].paths.push(path);
      const delivery = this.fromRawData(rawDelivery);

      return delivery;
    }
  }
};
