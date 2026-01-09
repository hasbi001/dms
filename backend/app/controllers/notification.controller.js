const { Notification } = require('../models');

const list = async (req, res) => {
  const notifications = await Notification.findAll({ where: { userId: req.user.id }, order: [['createdAt','DESC']] });
  res.json(notifications);
};

const markAsRead = async (req, res) => {
  const notification = await Notification.findByPk(req.params.id);
  if (!notification) return res.status(404).json({ message: 'Notification not found' });

  await notification.update({ read: true });
  res.json({ message: 'Marked as read' });
};

module.exports = { list, markAsRead };
