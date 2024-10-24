var express = require('express');
var router = express.Router();
var {getWeatherForCity} = require('../api/weatherController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',);
});

router.get('/api/weather/:city', getWeatherForCity);




module.exports = router;
