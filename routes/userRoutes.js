const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
//ROUTE HANDLERS

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

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
