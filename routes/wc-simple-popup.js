var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-simple-popup', { title: 'WebComponents-simple popup' });
});

module.exports = router;