module.exports = class User {
  constructor({ id, name, cpf, roles, addresses }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.roles = roles;
    this.addresses = addresses;
  }
};
