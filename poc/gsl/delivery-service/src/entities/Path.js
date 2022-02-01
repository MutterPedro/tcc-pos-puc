module.exports = class Path {
  constructor({ from, to, arrivedAt, leftAt, responsible }) {
    this.from = from;
    this.to = to;
    this.arrivedAt = arrivedAt ? new Date(arrivedAt) : null;
    this.leftAt = new Date(leftAt);
    this.responsible = responsible;
  }

  getDistance() {}
};
