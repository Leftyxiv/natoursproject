const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //const newUser = await User.create(req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and pw exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and password', 400));
  }
  //check if user exists && pw is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }
  //if gucci send a token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //GET TOKEN AND CHECK IF IT EXISTS
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //console.log(token);
  if (!token) {
    return next(
      new AppError('you must be logged in, please log in for access', 401)
    );
  }
  //VALIDATE THE TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //CHECK IF USER EXISTS
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('The user no longer exists', 401));
  }

  //CHECK IF USER CHANGED PWT AFTER TOKEN WAS ISSUED
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'The passwsord has been changed recently please log in again',
        401
      )
    );
  }

  //GRANTS ENTRANCE TO THE NEXT MIDDLEWARE ON THE ROUTE.
  req.user = currentUser;
  next();
});
