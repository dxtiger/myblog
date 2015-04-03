var express = require('express'),
	jade = require('jade'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	route = require('./routes'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	app = express(),
	port = 8085,
	RedisStore = require('connect-redis')(session);

	
	
	
app.engine('jade',jade.__express,{pretty:true});
app.set('view engine','jade');
app.locals.pretty = true;
app.set('views', __dirname + '/views');
app.set('title','tigers blog');

//app.use(express.compress()); // gzip
app.use(express.static(__dirname + '/static')); /** 静态文件地址前缀 **/


/** 上传图片控件 **/
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({
	dest : './static/upload'
})); // for parsing multipart/form-data

app.use(cookieParser());




app.set('trust proxy', 1);
app.use(session({
	store : new RedisStore({
		host: '127.0.0.1',
    	port: 6379,
    	db : 5
	}),
	secret: 'tiger412722',
	resave: true,
	saveUninitialized: true
}));


route(app);
app.listen(port);