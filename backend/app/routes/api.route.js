const express = require('express');
const authController = require('../controllers/auth.controller');
const documentController = require('../controllers/document.controller');
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Documents
router.get('/documents', authMiddleware, documentController.list);
router.post('/documents', authMiddleware, upload.single('file'), documentController.upload);
router.put('/documents/:id/replace', authMiddleware, documentController.requestReplace);
router.delete('/documents/:id', authMiddleware, documentController.requestDelete);

// Admin Approvals
router.post('/permissions/:id/approve', authMiddleware, roleMiddleware(['ADMIN']), documentController.approvePermission);
router.post('/permissions/:id/reject', authMiddleware, roleMiddleware(['ADMIN']), documentController.rejectPermission);

// Notifications
router.get('/notifications', authMiddleware, notificationController.list);
router.put('/notifications/:id/read', authMiddleware, notificationController.markAsRead);

module.exports = router;
