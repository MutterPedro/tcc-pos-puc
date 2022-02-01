class Controller {
  constructor(verb, path) {
    this.verb = verb;
    this.path = path;
    this.middlewares = [];
  }

  handle() {
    throw new Error('handle method must be implemented');
  }
}

module.exports = Controller;
