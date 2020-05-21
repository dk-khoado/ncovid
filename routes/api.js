var express = require('express');
var router = express.Router();
var hash = require('crypto');
var userModel = require('../models/userProfile');
const user = new userModel();

router.post('/login', (req, res) => {

    user.dangNhap(req.body.username, req.body.password, (error, result) => {
        if (error) {
            console.log(error);
            res.status(200).send({success: false});
            return;
        }

        if (result.success == 1) {            
            res.status(200).send(result);
            return;
        }

        if (result.success == 0) {
            res.status(200).send({success: true, token: ""});
            return;
        }
        res.status(200).send({success: false, token: ""});
    });
})

module.exports = router;