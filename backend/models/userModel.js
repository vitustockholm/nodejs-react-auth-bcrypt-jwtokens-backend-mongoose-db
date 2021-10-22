const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// - - - for signup
// saving with preparation
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

//- - - for login
// adding (on existing mongoose methods) new method matchPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPAssword, this.password); //bcrypt method compare
};

const User = mongoose.model('User', userSchema);

module.exports = User;
