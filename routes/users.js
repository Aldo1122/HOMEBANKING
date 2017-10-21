var express = require('express');
var config = require('../config');
var User = require('../models/user');
var jwt = require("jsonwebtoken");

const router = express.Router();

/* GET users listing. */
router.get('/pippo', function(req, res, next) {
  return  res.json({ pippo: { soldi: "500" } });
});

// req => richiesta => i dati che l'utente ha mandato
router.post("/register", function(req, res) {
  // timeout for the loading screen thing

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      });
      // add a check if username and email already exists and throw that erro
      // add function user
      User.addUser(newUser, function(err, user) {
        if (err) {
          res.status(400).json("there was an error");
        } else {
          res.json({ success: true });
        }
            });
      });


// authentication route
router.post("/authenticate", function(req, res) {
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ errors: { username: "user not found" } });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, "pippo", {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ errors: { password: "wrong password " } });
      }
    });
  });
});


module.exports = router;
