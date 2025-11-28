import Admin from '../models/Admin.js';
import Manager from '../models/Manager.js';
import Employee from '../models/Employee.js';
import crypto from 'crypto';

// Reset Password (for all roles)
export const resetPassword = async (req, res) => {
  try {
    const { token, password, role } = req.body;

    if (!token || !password || !role) {
      return res.status(400).json({ message: 'Please provide token, password, and role' });
    }

    // Hash the token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    let user = null;

    // Find user by role
    if (role === 'admin') {
      user = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    } else if (role === 'manager') {
      user = await Manager.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    } else if (role === 'employee') {
      user = await Employee.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

