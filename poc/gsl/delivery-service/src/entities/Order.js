module.exports = class Order {
  constructor({ id, user, items, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.items = items;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  getTotalPrice() {}
};
