const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a name is required'],
  },
  email: {
    type: String,
    required: [true, 'an email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'a password is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'the passwords must match'],
    validate: {
      //THIS ONLY WORKS ON SAVE!!
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
