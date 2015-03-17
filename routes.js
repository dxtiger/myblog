var list = require('./api/list'),
	info = require('./api/info'),
	add = require('./api/add'),
	login = require('./api/login'),
	register = require('./api/register'),
	authentication = require('./api/authentication'),
	about = require('./api/about');


module.exports = function(app) {

	app.all(/add|edit|del/,function(req,res,next){
		authentication(req,res,next);
	})
	
	// ?n=页码
	app.get('/',list);

	app.get('/info/:gid',info);

	// 文章
	app.get('/add',add.get);
	app.post('/add',add.post);
	app.get('/edit/:gid',add.edit);
	app.get('/del/:gid',add.del);


	// 评论
	// 等待开发

	// about
	app.get('/about',about);

	
	// login
	app.get('/login',login.get);
	app.post('/login',login.post);
	app.get('/logout',login.logout);

	// register
	app.get('/register',register.get);
	app.post('/register',register.post);

}