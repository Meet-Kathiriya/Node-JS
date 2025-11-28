import Manager from '../models/Manager.js';
import Employee from '../models/Employee.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmployeeWelcomeEmail, sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'employee-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// 7. Manager Login
export const loginManager = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Please provide username/email and password' });
    }

    // Find manager by username or email
    const manager = await Manager.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!manager) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!manager.isActive) {
      return res.status(401).json({ message: 'Your account has been deactivated' });
    }

    // Check password
    const isMatch = await manager.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(manager._id, manager.role);

    res.json({
      message: 'Login successful',
      token,
      manager: {
        id: manager._id,
        username: manager.username,
        email: manager.email,
        phone: manager.phone,
        role: manager.role,
        isActive: manager.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 8. Manager Profile
export const getManagerProfile = async (req, res) => {
  try {
    const manager = await Manager.findById(req.user._id)
      .select('-password')
      .populate('adminId', 'username email');
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 9. Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    const manager = await Manager.findById(req.user._id);

    // Check current password
    const isMatch = await manager.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    manager.password = newPassword;
    await manager.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 10. Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    manager.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    manager.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await manager.save();

    // Send email
    try {
      await sendPasswordResetEmail(manager.email, resetToken, 'manager');
      res.json({ message: 'Password reset email sent' });
    } catch (emailError) {
      manager.resetPasswordToken = undefined;
      manager.resetPasswordExpire = undefined;
      await manager.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 13. Add Employee
export const addEmployee = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const managerId = req.user._id;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if employee exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { username }]
    });

    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email or username already exists' });
    }

    // Create employee
    const employee = await Employee.create({
      username,
      email,
      phone,
      password,
      image,
      managerId
    });

    // Send welcome email
    const portalLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/employee/login`;
    try {
      await sendEmployeeWelcomeEmail(employee.email, employee.username, password, portalLink);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Employee added successfully',
      employee: {
        id: employee._id,
        username: employee.username,
        email: employee.email,
        phone: employee.phone,
        image: employee.image,
        isActive: employee.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 18. View All Employees (by Manager)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ managerId: req.user._id })
      .select('-password')
      .populate('managerId', 'username email')
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

