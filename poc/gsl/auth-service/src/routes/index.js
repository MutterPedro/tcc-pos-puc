const { Router } = require('express');
const login = require('./login');

const router = Router();

router.use(login);

module.exports = router;
