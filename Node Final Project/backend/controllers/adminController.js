import Admin from '../models/Admin.js';
import Manager from '../models/Manager.js';
import Employee from '../models/Employee.js';
import { generateToken } from '../utils/generateToken.js';
import { sendManagerWelcomeEmail, sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// 1. Admin Registration
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    // Validation
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email or username already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      phone,
      password,
      role: role || 'admin'
    });

    const token = generateToken(admin._id, admin.role);

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Please provide username/email and password' });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, admin.role);

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    const admin = await Admin.findById(req.user._id);

    // Check current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    // Send email
    try {
      await sendPasswordResetEmail(admin.email, resetToken, 'admin');
      res.json({ message: 'Password reset email sent' });
    } catch (emailError) {
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpire = undefined;
      await admin.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Add Manager
export const addManager = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const adminId = req.user._id;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if manager exists
    const existingManager = await Manager.findOne({
      $or: [{ email }, { username }]
    });

    if (existingManager) {
      return res.status(400).json({ message: 'Manager with this email or username already exists' });
    }

    // Create manager
    const manager = await Manager.create({
      username,
      email,
      phone,
      password,
      adminId
    });

    // Send welcome email
    const portalLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/manager/login`;
    try {
      await sendManagerWelcomeEmail(manager.email, manager.username, password, portalLink);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Manager added successfully',
      manager: {
        id: manager._id,
        username: manager.username,
        email: manager.email,
        phone: manager.phone,
        isActive: manager.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 11. Get All Managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find({ adminId: req.user._id })
      .select('-password')
      .populate('adminId', 'username email')
      .sort({ createdAt: -1 });

    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 12. Delete/Deactivate Manager
export const toggleManagerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const manager = await Manager.findById(id);

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    if (manager.adminId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this manager' });
    }

    manager.isActive = isActive !== undefined ? isActive : !manager.isActive;
    await manager.save();

    res.json({
      message: `Manager ${manager.isActive ? 'activated' : 'deactivated'} successfully`,
      manager
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 19. View All Employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .select('-password')
      .populate('managerId', 'username email')
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 20. Delete/Deactivate Employee
export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.isActive = isActive !== undefined ? isActive : !employee.isActive;
    await employee.save();

    res.json({
      message: `Employee ${employee.isActive ? 'activated' : 'deactivated'} successfully`,
      employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

