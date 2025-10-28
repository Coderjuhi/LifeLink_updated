const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected
router.get('/me', authMiddleware, authController.me);
router.post('/logout', authController.logout);

module.exports = router;
