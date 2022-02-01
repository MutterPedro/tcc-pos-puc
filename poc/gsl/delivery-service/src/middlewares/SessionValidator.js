module.exports = class SessionValidator {
  validate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token || token !== 'Bearer IAMAVALIDSESSIONTOKEN') {
      return res.status(403).json({ message: 'invalid session token' });
    }

    next();
  }
};
