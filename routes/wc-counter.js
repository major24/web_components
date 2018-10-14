var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-counter', { title: 'WebComponents-counter' });
});

module.exports = router;