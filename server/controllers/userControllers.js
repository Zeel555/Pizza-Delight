const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const asyncHandler = require('express-async-handler');

// Utils
const generateToken = require('../utils/generateToken');

// Email
const sendEmail = require('../middlewares/nodemailerMiddleware');

// Schema
const User = require('../schemas/userSchema');

/**
 * Generate unique 6-digit verification code
 */
const generateVerificationCode = async () => {
  let code;
  let user;

  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    user = await User.findOne({ verificationCode: code });
  } while (user);

  return code;
};

/**
 * @desc    Login user
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  }

  if (!emailValidator.validate(email)) {
    res.status(400);
    throw new Error('Invalid Email Address!');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid Email or Password!');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(401);
    throw new Error('Invalid Email or Password!');
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    orders: user.orders,
    isVerified: user.isVerified,
    token: generateToken(user._id),
    message: 'Login Successful!',
  });
});

/**
 * @desc    Register user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, phoneNumber, address } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  }

  if (!emailValidator.validate(email)) {
    res.status(400);
    throw new Error('Invalid Email Address!');
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error('User Already Exists!');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords Do Not Match!');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Password Must Be At Least 8 Characters Long!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = await generateVerificationCode();

  // CREATE USER FIRST
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
    verificationCode,
    isVerified: false,
  });

  // SEND EMAIL (NON-BLOCKING)
  sendEmail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Verify your Pizza Delight account',
    text: `Hi ${name},

Your verification code is: ${verificationCode}

Thanks,
Pizza Delight 🍕`,
  }).catch(() => {
    console.log('⚠️ Verification email failed, user still registered');
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    orders: user.orders,
    isVerified: user.isVerified,
    token: generateToken(user._id),
    message: 'User Registered Successfully!',
  });
});

/**
 * @desc    Verify user
 * @route   POST /api/users/verify
 * @access  Public
 */
const verifyUser = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  }

  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== verificationCode) {
    res.status(400);
    throw new Error('Invalid Verification Code!');
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.status(200).json({
    message: 'User Verified Successfully!',
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/users/forgotpassword
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !emailValidator.validate(email)) {
    res.status(400);
    throw new Error('Invalid Email Address!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User Not Found!');
  }

  const resetToken = await generateVerificationCode();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  sendEmail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Reset your Pizza Delight password',
    text: `Your password reset code is: ${resetToken}`,
  }).catch(() => {
    console.log('⚠️ Reset email failed');
  });

  res.status(200).json({
    message: 'Password reset code sent',
  });
});

/**
 * @desc    Reset password
 * @route   POST /api/users/resetpassword
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetToken, newPassword, confirmNewPassword } = req.body;

  if (!email || !resetToken || !newPassword || !confirmNewPassword) {
    res.status(400);
    throw new Error('All Fields Are Required!');
  }

  const user = await User.findOne({ email });

  if (
    !user ||
    user.resetPasswordToken !== resetToken ||
    user.resetPasswordExpire < Date.now()
  ) {
    res.status(400);
    throw new Error('Invalid or Expired Reset Token!');
  }

  if (newPassword !== confirmNewPassword || newPassword.length < 8) {
    res.status(400);
    throw new Error('Invalid Password!');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  res.status(200).json({
    message: 'Password Reset Successful!',
  });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User Not Found!');
  }

  res.json(user);
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User Not Found!');
  }

  Object.assign(user, req.body);
  await user.save();

  res.json({
    message: 'Profile Updated Successfully!',
  });
});

/**
 * ADMIN
 */
const getAllUsers = asyncHandler(async (req, res) => {
  res.json(await User.find({}));
});

const getUserById = asyncHandler(async (req, res) => {
  res.json(await User.findById(req.params.id));
});

const updateUserById = asyncHandler(async (req, res) => {
  res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

const deleteUserById = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User Removed Successfully!' });
});

/**
 * EXPORTS (ALL KEPT)
 */
module.exports = {
  authUser,
  registerUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
