var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wc-yes-no-selector', { 
    title: 'WebComponents-yes-no-selector',
    fruits: ['Apple', 'Orange', 'Mango', 'Banana']
  
  });
});

module.exports = router;