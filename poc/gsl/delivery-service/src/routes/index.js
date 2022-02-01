const { Router } = require('express');
const login = require('./delivery');

const router = Router();

router.use(login);

module.exports = router;
