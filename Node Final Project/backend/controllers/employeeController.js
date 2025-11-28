import Employee from '../models/Employee.js';
import { generateToken } from '../utils/generateToken.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';

// 14. Employee Login
export const loginEmployee = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Please provide username/email and password' });
    }

    // Find employee by username or email
    const employee = await Employee.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!employee.isActive) {
      return res.status(401).json({ message: 'Your account has been deactivated' });
    }

    // Check password
    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(employee._id, employee.role);

    res.json({
      message: 'Login successful',
      token,
      employee: {
        id: employee._id,
        username: employee.username,
        email: employee.email,
        phone: employee.phone,
        image: employee.image,
        role: employee.role,
        isActive: employee.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 15. Employee Profile
export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id)
      .select('-password')
      .populate('managerId', 'username email');
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 16. Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    const employee = await Employee.findById(req.user._id);

    // Check current password
    const isMatch = await employee.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    employee.password = newPassword;
    await employee.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 17. Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    employee.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    employee.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await employee.save();

    // Send email
    try {
      await sendPasswordResetEmail(employee.email, resetToken, 'employee');
      res.json({ message: 'Password reset email sent' });
    } catch (emailError) {
      employee.resetPasswordToken = undefined;
      employee.resetPasswordExpire = undefined;
      await employee.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

