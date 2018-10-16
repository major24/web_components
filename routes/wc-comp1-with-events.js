var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-comp1-with-events', { title: 'WebComponents-Comp1 with events' });
});

module.exports = router;