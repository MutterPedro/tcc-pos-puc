const UserService = require('../services/UserService');

module.exports = class PermissionValidator {
  constructor(requiredPermissions) {
    this.requiredPermissions = requiredPermissions;
    this.userService = new UserService();
  }

  async validate(req, res, next) {
    const id = req.headers['x-user-id'];

    if (!id) {
      return res.status(422).json({ message: 'invalid user id' });
    }

    if (
      await this.userService.isUserAllowedTo(
        Number(id),
        this.requiredPermissions,
      )
    ) {
      next();
      return;
    }

    return res
      .status(403)
      .json({ message: 'user is not allowed to perform this action' });
  }
};
