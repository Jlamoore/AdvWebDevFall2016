var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controllers/about');

/* GET home page. */
router.get('/', ctrlAbout.about);

module.exports = router;