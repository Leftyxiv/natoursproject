const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'the passwords must match'],
    validate: {
      //THIS ONLY WORKS ON SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'pws are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //ONLY RUN THIS FUNCTION IF THE PASSWORD HAS BEEN MODIFIED
  if (!this.isModified('password')) return next();

  //HASH THE PASSWORD WITH A COST OF 12
  this.password = await bcrypt.hash(this.password, 12);

  //DELETE THE PASSWORD CONFIRM FIELD
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
