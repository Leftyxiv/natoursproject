const mongoose = require('mongoose');

const klackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
  },
  message: {
    type: String,
  },
});

const klackMessage = mongoose.model('messsage', klackSchema);

module.exports = klackMessage;

