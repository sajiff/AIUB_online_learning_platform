var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var home = require('./controller/home');
var login = require('./controller/login');
var superadmin = require('./controller/superadmin');
var admin = require('./controller/admin');
var instructor = require('./controller/instructor');
var student = require('./controller/student');
var moderator = require('./controller/moderator');
var files = require('express-fileupload');
var app 		= express();

//config
app.set('view engine', 'ejs');

app.use('/Assets', express.static('assets'));


//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use(files());

app.use('/home', home);
app.use('/login', login);
app.use('/superadmin', superadmin);
app.use('/admin', admin);
app.use('/moderator', moderator);
app.use('/instructor', instructor);
app.use('/student', student);

app.get('/', function(req, res){
	res.redirect('/home');
});

app.listen(3000, function(){
	console.log('express http server started at...3000');
});
