var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-hello-world', { title: 'WebComponents' });
});

module.exports = router;
