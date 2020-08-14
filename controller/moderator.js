var express   = require('express');
var usermodel = require.main.require('./models/user');
//var adminmodel  = require.main.require('./models/adminmodel');
var moderatormodel  = require.main.require('./models/moderatormodel');
var instructormodel   = require.main.require('./models/instructormodel');
var studentmodel  = require.main.require('./models/studentmodel');
//var coursesmodel  = require.main.require('./models/coursesmodel');
var router    = express.Router();

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
  res.render('moderator/index');
});

router.get('/usermanagement', function(req, res){
  instructormodel.getAll(function(instructor_results){
    studentmodel.getAll(function(student_results){
      res.render('moderator/usermanagement', {student_list : student_results, instructor_list : instructor_results, uname : req.session.username});
    });

  });
});
router.post('/addUser', function(req, res){
  if (req.body.role == 4 ) {
    var user = {
    id : req.body.id,
    name : req.body.name,
    email : req.body.email,
    phone_number : req.body.Phone,
    courses : 0
  };
  var login = {
    username : req.body.name,
    password : req.body.Password,
    role : 3
  };
  instructormodel.insert(user, function(status){
    if(status){
      usermodel.insert(login, function(sta){
        if(sta){
          res.redirect("/moderator/usermanagement");
        }
      });
    }
  });
  }
  else if (req.body.role == 5 ){
    var user = {
    ID : req.body.id,
    name : req.body.name,
    email : req.body.email,
    phone_number : req.body.Phone,
    program : 0,
    courses : 0,
    CGPA : 0
  };
  var login = {
    username : req.body.name,
    password : req.body.Password,
    role : 3
  };
  studentmodel.insert(user, function(status){
    if(status){
      usermodel.insert(login, function(sta){
        if(sta){
          res.redirect("/moderator/usermanagement");
        }
      });
    }
  });
  }

});
router.get('/useractivity', function(req, res){
  res.render('moderator/useractivity');
});

router.get('/courseforstudent', function(req, res){
  res.render('moderator/courseforstudent');
});

router.get('/instructorallocation', function(req, res){
  res.render('moderator/instructorallocation');
});

router.get('/profilesettings', function(req, res){
  res.render('moderator/profilesettings');
});

router.get('/security', function(req, res){
  res.render('moderator/security');
});

router.get('/myaccount', function(req, res){
  res.render('moderator/myaccount');
});

router.get('/myinbox', function(req, res){
  res.render('moderator/index');
});



module.exports = router;
