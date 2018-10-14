var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('custom-event-simple-textarea', { title: 'CustomEvent-SimpleTextArea' });
});

module.exports = router;