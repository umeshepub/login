module.exports = function(app) {
var matched = 0;
var notmatched = 0;
// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		console.log("index.ejs");
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		//console.log(req + " RRRRRRRRRRRRequest " + passport.usernameField);
		 var insertQuery = "INSERT INTO users ( username`, `password` )  values ('1x','1x')";
 var connection = mysql.createConnection(dbconfig.connection);
            
            connection.query('USE ' + dbconfig.database);
                        connection.query(insertQuery, function(err, rows) {
                            newUser.id = rows.insertId;
                            console.log('connected as id ' + req.connection.threadId);
                          });
                            
                            
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		//connection.end();
		res.redirect('/');
	});

// ========================= AUTHENTICATE (FIRST LOGIN) ==================================================

app.post('/login',function(req, res){
		var correctUserName = "123";//req.body.username; 
		var correctPassword = "123";//req.body.password; 
		console.log("UN" + req.body.username);
		console.log("pwd" + req.body.password);
		if (req.body.username === '123'){
			matched++;
			console.log( "if Match " + matched);
			//res.send("shwetha") 	
		}
		else{
			notmatched++;
			console.log( "NOt match " + notmatched);
		}
		res.redirect('/');
		
		
		//console.log(res);
	});

		// process the login form
		/*app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
*/
		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		app.get('/showresult', function(req, res) {
			console.log("Show result " + matched);
			res.render('result.ejs', { matches: matched, unmatched: notmatched});
		});


		// process the signup form
/*		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
*/
	// facebook -------------------------------

	

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
	/*
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
*/
	

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	/*if (req.isAuthenticated())
		return next();

	res.redirect('/');*/
}
