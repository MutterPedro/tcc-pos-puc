const RoleService = require('./RoleService');

class UserService {
  constructor() {
    this.roleService = new RoleService();
  }

  async isUserAllowedTo(userId, requiredPermissions) {
    const roles = await this.roleService.getRolesByUserId(userId);
    const permissions = Object.values(roles).flatMap(
      (permissions) => permissions,
    );

    return requiredPermissions.every((p) => permissions.includes(p));
  }
}

module.exports = UserService;
