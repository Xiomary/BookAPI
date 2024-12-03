const mongoose = require('mongoose');
const { Schema } = mongoose; 
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  isAdmin: {
    type: Boolean,
    required: false,
  }
});

// Pre-save middleware to hash the password before saving

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.post('save', function(doc, next) {
  console.log(`User ${doc.username} has been saved successfully.`);
  next();
});

module.exports = mongoose.model('User', userSchema);
