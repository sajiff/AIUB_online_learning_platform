var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
  res.render('student/index', {uname : req.session.username});
});

router.get('/mycourse', function(req, res){
  res.render('student/mycourse', {uname : req.session.username});
});

router.get('/mygrades', function(req, res){
  res.render('student/mygrades', {uname : req.session.username});
});

router.get('/profilesettings', function(req, res){
  res.render('student/profilesettings', {uname : req.session.username});
});

router.get('/security', function(req, res){
  res.render('student/security', {uname : req.session.username});
});

router.get('/consultation', function(req, res){
  res.render('student/consultation', {uname : req.session.username});
});

router.get('/myaccount', function(req, res){
  res.render('student/myaccount', {uname : req.session.username});
});

router.get('/myinbox', function(req, res){
  res.render('student/myinbox', {uname : req.session.username});
});

router.get('/coursefile', function(req, res){
  res.render('student/coursefile', {uname : req.session.username});
});


module.exports = router;
