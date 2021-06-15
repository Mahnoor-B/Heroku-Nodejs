const express = require('express');
const router = express.Router();
const userEmail = require('../controller/userEmail');

router.post('/index', userEmail);

router.use(function(req, res, next) {
    console.log('Inside index router.');
    next(); // make sure we go to the next routes and don't stop here
});

module.exports = router;