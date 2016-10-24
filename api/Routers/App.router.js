var _ = require('lodash');
var express = require('express');
var router = express.Router();

router.post('/route-path', function (req, res, next) {
    // req.body.
    res.status(200).json({
    });
});

module.exports = router;