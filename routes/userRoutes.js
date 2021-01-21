const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//ROUTE HANDLERS

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//PROTECT OUR ROUTES AFTER THIS MIDDLEWARE
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

//12.7.0.01/api/v1/users/
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

//127.0.0.1/api/v1/users/:id
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
