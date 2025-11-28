import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Manager from '../models/Manager.js';
import Employee from '../models/Employee.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = null;
    
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password');
    } else if (decoded.role === 'manager') {
      user = await Manager.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        return res.status(401).json({ message: 'Manager account is deactivated' });
      }
    } else if (decoded.role === 'employee') {
      user = await Employee.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        return res.status(401).json({ message: 'Employee account is deactivated' });
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.user.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

