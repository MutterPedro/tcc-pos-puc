module.exports = class Delivery {
  constructor({ id, order, status, paths }) {
    this.id = id;
    this.order = order;
    this.status = status;
    this.paths = paths || [];
  }
};
