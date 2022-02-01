const app = require('./app');
const { PORT } = require('./utils/environment');

app.listen(PORT, () => {
  console.info(`Server is running. Listening on http://localhost:${PORT}`);
  console.debug('Press CTRL+C to exit');
});
