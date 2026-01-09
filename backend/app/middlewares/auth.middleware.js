const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config/auth.config');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch(err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
