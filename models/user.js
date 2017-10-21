var mongoose = require ("mongoose");
var config = require ("../config");
var bcrypt = require("bcryptjs");

//User schema
const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  passwordConfirmation: { type: String, required: true },
});


const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.addUser = (newUser, callback) => {
  //hash the password passed here as a param
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

  module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
  };


  module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  };