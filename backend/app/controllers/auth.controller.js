const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config/auth.config')

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash: hash, role });
    res.status(201).json({ message: 'User registered', user: { id: user.id, username, email, role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login };
