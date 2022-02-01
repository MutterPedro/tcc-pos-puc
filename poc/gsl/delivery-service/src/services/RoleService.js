const { AUTH_SERVICE_URL } = require('../utils/environment');
const { httpClient } = require('../utils/httpClient');

class RoleService {
  constructor() {
    this.authClient = httpClient(AUTH_SERVICE_URL);
  }

  async getRolesByUserId(userId) {
    const { data } = await this.authClient.get('/roles', {
      params: {
        user_id: userId,
      },
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });

    return JSON.parse(data).roles;
  }
}

module.exports = RoleService;
