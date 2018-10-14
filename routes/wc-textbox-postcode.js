var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-textbox-postcode', { title: 'WebComponents-Textbox-Postcode' });
});

module.exports = router;