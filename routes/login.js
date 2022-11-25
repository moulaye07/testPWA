const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

router.post("/", (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(account => {
      if (account.length < 1) {
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      bcrypt.compare(req.body.password, account[0].password, (err, resp) => {
        console.log(err);
        if (err) {
          return res.status(401).json({
            message: "Auth failed2"
          });
        }
        if (resp) {
          const token = jwt.sign(
            {
              email: account.email,
              accountId: account[0]._id,
              username: account[0].username
            },
            config.secret,
            {
              expiresIn: 86400
            }
          );
          return res.status(200).json({
            user: {
              username: account[0].username,
              email: account[0].email,
              accountId: account[0]._id
            },
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed3"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
