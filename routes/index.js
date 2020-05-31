var express = require('express');
var router = express.Router();
var userModel = require('../models/userProfile');
var khuVucModel = require('../models/khuVuc');
/* GET home page. */
router.get('/', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.getThanhPho((error, data) => {
    if (error) {
      res.render('index', { title: 'Quản lý cách ly tại nhà', activeTab: "index" });
    } else {
      res.render('index', { title: 'Quản lý cách ly tại nhà', activeTab: "index", listCity: data });
    }
  });

});

router.get('/setting', function (req, res, next) {
  var khuVuc = new khuVucModel();
  khuVuc.getThanhPho((error, data) => {

    res.render('setting', { title: 'Cài đặt ứng dụng', activeTab: "setting", listCity: data });

  })

});

router.get('/user', function (req, res, next) {
  res.render('users', { title: 'Quản lý cách ly tại nhà', activeTab: "user" });
});

router.get('/user/edit/:id', function (req, res, next) {
  var users = new userModel();
  
  users.getCachLyByID(req.params.id, (err, data) => {
    if (err) {
      res.send(404);
    } else {
      res.render('cachLy/edit', { title: 'Quản lý cách ly tại nhà', activeTab: "user", data: data });
    }
  })
});

router.post('/user/edit/:id', function (req, res, next) {
  var users = new userModel();
  
  users.capNhatThongTin(req.params.id, req.body,(err, data) => {
    if (err) {
      res.send("lỗi hệ thống vui long báo cáo quản trị viên !");
    } else {
      res.redirect(req.url);
    }
  })
});


router.post('/newProfile', function (req, res, next) {
  res.locals.title = "";
  res.locals.activeTab = "";
  var body = req.body;
  var userProfile = new userModel();
  userProfile.themMoi(body);
  res.redirect('/');
});

router.get('/kiemTraCMND/:cmnd', function (req, res, next) {

  var userProfile = new userModel();
  userProfile.kiemTraCMND(req.params.cmnd, (err, result) => {

    if (result) {
      res.status(200).send({ result: 1 })
      return;
    }

    res.status(200).send({ result: 0 })
  })

});

router.post('/newCity', function (req, res, next) {

  var body = req.body;
  var khuVuc = new khuVucModel();
  khuVuc.themThanhPho(body.name, (err, data) => {

    if (err) {
      res.send({ success: false })
    } else {
      res.send({ success: true })
    }

  });

});

router.get('/thanhPho', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.getThanhPho((err, data) => {
    if (err) {

    } else {
      res.send(data);
    }    
  })
});


router.get('/quanHuyen/:id', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.getQuanHuyen(req.params.id, (err, data) => {
    if (err) {
      res.send([]);
    } else {
      res.send(data);
    }
  })
});


router.post('/quanHuyen', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.themQuanHuyen(req.body.id, req.body.name, (err, data) => {
    if (err) {
      res.send([]);
    } else {
      res.status(201).send(data);
    }
  })
});

router.get('/phuongXa/:id', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.getPhuongXa(req.params.id, (err, data) => {
    if (err) {
      res.send([]);
    } else {
      res.send(data);
    }
  })
});

router.post('/phuongXa', function (req, res, next) {
  var khuVuc = new khuVucModel();

  khuVuc.themPhuongXa(req.body.id, req.body.name, (err, data) => {
    if (err) {
      res.send([]);
    } else {
      res.status(201).send(data);
    }
  })
});
module.exports = router;
