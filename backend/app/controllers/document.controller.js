const { Document, Permission, User, Notification,sequelize } = require('../models');

// List documents with pagination + search
const list = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;
  const where = search ? { title: { [sequelize.Op.like]: `%${search}%` } } : {};
  const { rows, count } = await Document.findAndCountAll({ where, limit: parseInt(limit), offset });
  res.json({ data: rows, total: count });
};

// Upload document
const upload = async (req, res) => {
  try {
    const { title, description, documentType } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!fileUrl) return res.status(400).json({ message: 'File missing' });

    const doc = await Document.create({
      title,
      description,
      documentType,
      fileUrl,
      createdBy: req.user.id,
    });

    await Notification.create({
      userId: req.user.id,
      message: "The document has been successfully uploaded.",
      reade: false
    });

    res.status(201).json({ message: 'Document uploaded', document: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Request replace document
const requestReplace = async (req, res) => {
  const doc = await Document.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Document not found' });

  const permission = await Permission.create({
    userId: req.user.id,
    documentId: doc.id,
    action: 'REPLACE',
  });

  await doc.update({ status: 'PENDING_REPLACE' });
  await Notification.create({
      userId: req.user.id,
      message: "Document awaiting approval to replace",
      reade: false
    });
  res.json({ message: 'Replace requested, waiting admin approval', permission });
};

// Request delete document
const requestDelete = async (req, res) => {
  const doc = await Document.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Document not found' });

  const permission = await Permission.create({
    userId: req.user.id,
    documentId: doc.id,
    action: 'DELETE',
  });

  await doc.update({ status: 'PENDING_DELETE' });
  await Notification.create({
      userId: req.user.id,
      message: "Document awaiting approval to deleted",
      reade: false
    });
  res.json({ message: 'Delete requested, waiting admin approval', permission });
};

// Admin approve
const approvePermission = async (req, res) => {
  const permission = await Permission.findByPk(req.params.id);
  if (!permission) return res.status(404).json({ message: 'Permission not found' });

  const doc = await Document.findByPk(permission.documentId);

  await sequelize.transaction(async (t) => {
    if (permission.action === 'DELETE') {
      await doc.destroy({ transaction: t });
    } else if (permission.action === 'REPLACE') {
      // developer can handle actual file replace in frontend
      await doc.update({ status: 'ACTIVE' }, { transaction: t });
    }
    await permission.update({ status: 'APPROVED' }, { transaction: t });
  });
  await Notification.create({
      userId: req.user.id,
      message: "Document has been approved",
      reade: false
    });
  res.json({ message: 'Permission approved' });
};

// Admin reject
const rejectPermission = async (req, res) => {
  const permission = await Permission.findByPk(req.params.id);
  if (!permission) return res.status(404).json({ message: 'Permission not found' });

  const doc = await Document.findByPk(permission.documentId);
  await doc.update({ status: 'ACTIVE' });
  await permission.update({ status: 'REJECTED' });
  await Notification.create({
      userId: req.user.id,
      message: "Document has been rejected",
      reade: false
    });
  res.json({ message: 'Permission rejected' });
};

module.exports = { list, upload, requestReplace, requestDelete, approvePermission, rejectPermission };
