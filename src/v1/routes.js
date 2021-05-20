var express = require('express');
var router = express.Router();

// require file path
var filePath = require('../../config/initializers');

// api version
var currentVersion = filePath.currentVersionNumber;
var setPath = '/api/'+currentVersion // example '/v1'
var userPath = setPath + '/users';
var postPath = setPath + '/posts';
var districtPath = setPath + '/districts';

// Require all the necessary models here

user = require('../'+currentVersion+'/models/user');

post = require('../'+currentVersion+'/models/post');

district = require('../'+currentVersion+'/models/district');

//------------begin-----include all the necessary routes here----------------------
// include user routes
var userFile = require('../'+currentVersion+'/routes/user');
userFile.userRoutes(router,userPath);

var postFile = require('../'+currentVersion+'/routes/post');
postFile.postRoutes(router,postPath);

var districtFile = require('../'+currentVersion+'/routes/district');
districtFile.districtRoutes(router,districtPath);
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
