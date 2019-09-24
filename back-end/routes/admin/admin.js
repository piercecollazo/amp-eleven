var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
    res.send('Admin Worked')
})

//Add-category


module.exports = router