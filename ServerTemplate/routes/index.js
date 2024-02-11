var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  //render h1 with text
  res.render('index', { title: 'Express!!' });
} );

module.exports = router;
