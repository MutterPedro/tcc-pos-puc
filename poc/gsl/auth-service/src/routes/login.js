const { Router } = require('express');
const users = require('../db/users.json');
const roles = require('../db/roles.json');

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      message: 'Username and password are required',
    });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Username or password is incorrect',
    });
  }

  const permissions = user.roles.flatMap((role) => roles[role].permissions);

  res.status(200).json({
    session_token: 'IAMAVALIDSESSIONTOKEN',
    permissions,
  });
});

module.exports = router;
