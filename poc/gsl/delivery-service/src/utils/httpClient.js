const axios = require('axios');

function httpClient(url) {
  return new axios.Axios({ baseURL: url });
}

module.exports = { httpClient };
