const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const VerifyToken = require('../keys/verifyToken');
const config = require('../config/config');
const auth = require('../auth/AuthController');


//User verification 
router.get('/', VerifyToken, function (req, res, next) {

  Users.findById(req.userId,
    { password: 0 }, //projection no password being sent to the client
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
});

router.post('/login', function (req, res) {

  Users.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token });
  });

});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

//add a new record
router.post("/signup", (req, res, next) => {
  Users.create(req.body).then((user) => {
    res.send(user);
  }).catch(next);
});


module.exports = router;