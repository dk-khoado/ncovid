var express = require('express');
var router = express.Router();
var hash = require('crypto');
var userModel = require('../models/userProfile');
const user = new userModel();

router.post('/login', (req, res) => {

    user.dangNhap(req.body.username, req.body.password, (error, result) => {
        if (error) {
            console.log(error);
            res.status(200).send({ success: false });
            return;
        }

        if (result.success == 1) {
            res.status(200).send(result);
            return;
        }

        if (result.success == 0) {
            res.status(200).send({ success: true, token: "" });
            return;
        }
        res.status(200).send({ success: false, token: "" });
    });
})

router.post('/changePasswordFirst', (req, res) => {

    user.changePassFirst(req.body.username, req.body.password, req.body.oldpassword, (error, result) => {
        if (error) {
            console.log(error);
            res.status(200).send({ success: false });
            return;
        }

        if (result.result == 1) {
            res.status(200).send({ success: true });
            return;
        }
        res.status(200).send({ success: false });
    });
})

router.post('/checkin', (req, res) => {
    user.checkIn(req.body.latitude, req.body.longitude, req.body.status, req.body.userID, (error, result) => {
        if (error) {
            console.log(error);
            res.status(200).send({ success: false });
            return;
        }

        if (result.affectedRows > 0) {
            res.status(200).send({ success: true });
            return;
        }
        res.status(200).send({ success: false });
    });
});

router.post('/historycheckin', (req, res) => {
    user.getHistoryCheckIn(req.body.id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(200).send({ success: false,data:[] });
            return;
        }
        res.status(200).send({ success: true, data: result });
    });
 });
module.exports = router;