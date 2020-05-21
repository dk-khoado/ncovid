var express = require('express');
var router = express.Router();

const usesModel = require('../models/userProfile');

const users = new usesModel();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.get('/cachly', (req, res)=>{
    users.getAllCachLy((err, data)=>{
      if (err) {
        res.send([]);
      } else {        
        res.send(data[0]);
      }
    })
})

router.post('/cachly', (req, res)=>{
  users.themNguoiCachLy(req.body.id, req.body.soNgay,(err, data)=>{
    if (err) {
      res.send({status: false});
    } else {              
      res.send({status: true, data: data[0]});
    }
  })
})

router.get('/khaibao', (req, res)=>{
  users.getAll((err, data)=>{
    if (err) {
      res.send();
    } else {
      res.send(data);
    }
  })
})
module.exports = router;
