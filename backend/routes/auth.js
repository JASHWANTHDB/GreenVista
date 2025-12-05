const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, sendLoginOTP, verifyLoginOTP, verifyCredentialsSendOTP, registerSendOTP, verifyRegistrationOTP, forgotPasswordSendOTP, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('address').notEmpty().withMessage('Address is required'),
    body('apartmentNumber').optional()
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  login
);

// OTP Routes
router.post(
  '/verify-credentials-send-otp',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  verifyCredentialsSendOTP
);

router.post(
  '/send-otp',
  [
    body('email').isEmail().withMessage('Valid email required')
  ],
  sendLoginOTP
);

router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
  ],
  verifyLoginOTP
);

// Registration with OTP verification
router.post(
  '/register-send-otp',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('address').notEmpty().withMessage('Address is required'),
    body('apartmentNumber').optional()
  ],
  registerSendOTP
);

router.post(
  '/verify-registration-otp',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
  ],
  verifyRegistrationOTP
);

// Forgot Password Routes
router.post(
  '/forgot-password-send-otp',
  [
    body('email').isEmail().withMessage('Valid email required')
  ],
  forgotPasswordSendOTP
);

router.post(
  '/reset-password',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required')
  ],
  resetPassword
);

router.post('/logout', logout);

module.exports = router;
