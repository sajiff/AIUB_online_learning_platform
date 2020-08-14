var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var adminmodel 	= require.main.require('./models/adminmodel');
var studentmodel 	= require.main.require('./models/studentmodel');
var instructormodel 	= require.main.require('./models/instructormodel');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
  var user = {
		uname: req.body.userid,
		password: req.body.password
	};

  userModel.validate(user, function(status){
		if(status){
			req.session.username = user.uname;
			userModel.get(user.uname, function(result){
				if (result.role == 1){
					res.redirect('/superadmin');
				}
				else if (result.role == 2){
					res.redirect('/admin');
				}
				else if (result.role == 3){
					res.redirect('/moderator');
				}
				else if (result.role == 4){
					res.redirect('/instructor');
				}
				else if (result.role == 5){
					res.redirect('/student');
				}
			});
		}else{
      res.send('invalid usernam or password')
		}
	});

});

module.exports = router;
