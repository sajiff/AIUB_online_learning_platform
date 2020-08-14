var express   = require('express');
var usermodel = require.main.require('./models/user');
var adminmodel  = require.main.require('./models/adminmodel');
var moderatormodel  = require.main.require('./models/moderatormodel');
var instructormodel   = require.main.require('./models/instructormodel');
var studentmodel  = require.main.require('./models/studentmodel');
var coursesmodel  = require.main.require('./models/coursesmodel');
var router    = express.Router();

router.get('*', function(req, res, next){
  if(req.session.username == null){
    res.redirect('/login');
  }else{
    next();
  }
});

router.get('/', function(req, res){
  res.render('admin/index', {uname : req.session.username});
});

router.get('/moderatormanagement', function(req, res){
  moderatormodel.getAll(function(results){
    res.render('admin/moderatormanagement', {userlist : results, uname : req.session.username});
  });
});
//ad moderator
router.post('/addModerator', function(req, res){
  var user = {
    ID : req.body.id,
    name : req.body.name,
    email : req.body.email,
    address : req.body.address,
    phone_number : req.body.Phone
  };
  var login = {
    username : req.body.name,
    password : req.body.password,
    role : 3
  };
  moderatormodel.insert(user, function(status){
    if(status){
      usermodel.insert(login, function(sta){
        if(sta){
          res.redirect("/admin/moderatormanagement");
        }
      });
    }
  });
});

// update moderator
router.post('/updateModerator', function(req, res){
  var user = {
    ID : req.body.id,
    name : req.body.name,
    email : req.body.email,
    address : req.body.address,
    phone_number : req.body.Phone
  };
  moderatormodel.update(user, function(status){
    if(status){
      res.redirect("/admin/moderatormanagement");
    }
  });
});
//delete moderator
router.post('/deleteModerator', function(req, res){
  moderatormodel.delete(req.body.delete_button, function(status){
    if(status){
      res.redirect("/admin/moderatormanagement");
    }
  });
});
router.get('/usermanagement', function(req, res){
  instructormodel.getAll(function(instructor_results){
    studentmodel.getAll(function(student_results){
      res.render('admin/usermanagement', {student_list : student_results, instructor_list : instructor_results, uname : req.session.username});
    });

  });
});
//Add user
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
          res.redirect("/admin/usermanagement");
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
          res.redirect("/admin/usermanagement");
        }
      });
    }
  });
  }

});
//delete user
router.post('/deleteUser', function(req, res){
  usermodel.delete(req.body.delete_button, function(status){
    if(status){
      res.redirect("/admin/usermanagement");
    }
  });
});

router.get('/coursemanagement', function(req, res){
  coursesmodel.getAll(function(results){
    res.render('admin/coursemanagement', {courselist : results, uname : req.session.username});
  });

});
//add course
router.post('/addCourse', function(req, res){
  var user = {
    course_ID : req.body.id,
    course_name : req.body.name,
    section : req.body.section,
    instructor : req.body.instructor
  };

  coursesmodel.insert(user, function(status){
    if(status){
          res.redirect("/admin/coursemanagement");
    }
  });
});
//update course
router.post('/updateCourse', function(req, res){
  var user = {
    course_ID : req.body.id,
    course_name : req.body.name,
    section : req.body.section,
    instructor : req.body.instructor
  };

  coursesmodel.update(user, function(status){
    if(status){
          res.redirect("/admin/coursemanagement");
    }
  });
});
router.post('/deleteCourse', function(req, res){
  coursesmodel.delete(req.body.delete_button, function(status){
    if(status){
      res.redirect("/admin/coursemanagement");
    }
  });
});

router.get('/instructorallocation', function(req, res){
  res.render('admin/instructorallocation')
});

router.get('/courseforstudent', function(req, res){
  res.render('admin/courseforstudent')
});

router.get('/announcements', function(req, res){
  res.render('admin/announcements')
});

router.get('/profilesettings', function(req, res){
  res.render('admin/profilesettings')
});

router.get('/security', function(req, res){
  res.render('admin/security')
});

router.get('/myaccount', function(req, res){
  res.render('admin/myaccount')
});

router.get('/myinbox', function(req, res){
  res.render('admin/myinbox')
});


module.exports = router;
