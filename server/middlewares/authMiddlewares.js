const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../schemas/userSchema');
const Admin = require('../schemas/adminUserSchema');

// 🔐 Protect routes (User + Admin)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try USER first, then ADMIN
      let user = await User.findById(decoded.id).select('-password');
      if (!user) {
        user = await Admin.findById(decoded.id).select('-password');
      }

      if (!user) {
        res.status(401);
        throw new Error('Not Authorized, User Not Found!');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, Token Failed!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, No Token!');
  }
});

// 👑 Admin / SuperAdmin check (FIXED)
const admin = asyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (
      req.user.role === 'admin' ||
      req.user.role === 'superadmin' ||
      (req.user.permissions && req.user.permissions.includes('ALL'))
    )
  ) {
    next();
  } else {
    res.status(403);
    throw new Error('Not Authorized As An Admin!');
  }
});

module.exports = { protect, admin };
