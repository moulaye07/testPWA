const express = require('express');
const router = express.Router();
const Cities = require('../models/cities')

//get a list
router.get("/", (req, res, next) => {
  Cities.find({}).sort({ name: 1 }).then((cities) => {
    res.send(cities);
  })
})

router.get("/:city", (req, res, next) => {
  var name = (req.params.city).charAt(0).toUpperCase() + (req.params.city).slice(1)
  Cities.find({ name }).then((city) => {
    res.send(city);
  })
})

//add a new record
router.post("/", (req, res, next) => {
  Cities.create(req.body).then((cities) => {
    res.send(cities)
  }).catch(next)
});

module.exports = router