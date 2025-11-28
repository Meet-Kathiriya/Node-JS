import express from 'express';
import {
  loginManager,
  getManagerProfile,
  changePassword,
  forgotPassword,
  addEmployee,
  getAllEmployees,
  upload
} from '../controllers/managerController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', loginManager);
router.post('/forgot-password', forgotPassword);

// Protected routes (Manager only)
router.get('/profile', authenticate, authorize('manager'), getManagerProfile);
router.put('/change-password', authenticate, authorize('manager'), changePassword);
router.post('/add-employee', authenticate, authorize('manager'), upload.single('image'), addEmployee);
router.get('/employees', authenticate, authorize('manager'), getAllEmployees);

export default router;

