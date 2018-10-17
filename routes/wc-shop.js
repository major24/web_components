var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-shop', { title: 'WebComponents-Shop' });
});

module.exports = router;