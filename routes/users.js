var express = require('express');
var router = express.Router();

const usesModel = require('../models/userProfile');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');

});

router.get('/cachly', (req, res) => {
  const users = new usesModel();
  users.getAllCachLy((err, data) => {
    if (err) {
      res.send([]);
    } else {
      res.send(data[0]);
    }
  })
})

router.post('/cachly', (req, res) => {
  const users = new usesModel();
  users.themNguoiCachLy(req.body.id, req.body.soNgay, (err, data) => {
    if (err) {
      res.send({ status: false });
    } else {
      res.send({ status: true, data: data[0] });
    }
  })
})

router.get('/xoaCachLy', (req, res) => {
  const users = new usesModel();
  users.getAll((err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(data);
    }
  })
})

router.get('/khaibao', (req, res) => {
  const users = new usesModel();
  users.getAll((err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(data);
    }
  })
})

router.get('/khaibao/edit/:id', (req, res) => {
  const users = new usesModel();
  users.getAll((err, data) => {
    if (err) {
      res.send();
    } else {
      res.send(data);
    }
  })
})


module.exports = router;
