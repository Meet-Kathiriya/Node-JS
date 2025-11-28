import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  changePassword,
  forgotPassword,
  addManager,
  getAllManagers,
  toggleManagerStatus,
  getAllEmployees,
  toggleEmployeeStatus
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPassword);

// Protected routes (Admin only)
router.get('/profile', authenticate, authorize('admin'), getAdminProfile);
router.put('/change-password', authenticate, authorize('admin'), changePassword);
router.post('/add-manager', authenticate, authorize('admin'), addManager);
router.get('/managers', authenticate, authorize('admin'), getAllManagers);
router.put('/managers/:id/status', authenticate, authorize('admin'), toggleManagerStatus);
router.get('/employees', authenticate, authorize('admin'), getAllEmployees);
router.put('/employees/:id/status', authenticate, authorize('admin'), toggleEmployeeStatus);

export default router;

