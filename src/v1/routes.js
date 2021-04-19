var express = require('express');
var router = express.Router();

// require file path
var filePath = require('../../config/initializers');

// api version
var currentVersion = filePath.currentVersionNumber;
var setPath = '/api/'+currentVersion // example '/v1'

// Require all the necessary models here

bitcoin = require('../'+currentVersion+'/models/bitcoin');
// bitcoin_cash = require('../'+currentVersion+'/models/bitcoin_cash');

//------------begin-----include all the necessary routes here----------------------
// include user routes
var scoreFile = require('../'+currentVersion+'/routes/score');
scoreFile.scoreRoutes(router,setPath);

//------------end------------------------------------------------

// Default Route
router.get('/', function(req, res, next) {
  res.render('index', { condition: false });
});

router.get('/api', function(req, res, next) {
  res.send('In valid Request');
});

router.get('/api/v1', function(req, res, next) {
  res.send('In valid Request');
});

module.exports = router;
