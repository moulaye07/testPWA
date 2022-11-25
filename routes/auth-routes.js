const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require('../config/config');

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

module.exports = router