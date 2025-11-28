import express from 'express';
import {
  loginEmployee,
  getEmployeeProfile,
  changePassword,
  forgotPassword
} from '../controllers/employeeController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', loginEmployee);
router.post('/forgot-password', forgotPassword);

// Protected routes (Employee only)
router.get('/profile', authenticate, authorize('employee'), getEmployeeProfile);
router.put('/change-password', authenticate, authorize('employee'), changePassword);

export default router;

