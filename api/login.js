var model = require('../model/index'),
	validator = require('validator'),
	user = model.User;

var crypto = require('crypto');
	
function md5(str){
	var hash = crypto.createHash('md5');
	hash.update(str);
	str = hash.digest('hex');
	return str;
}

function get(req,res) {
	res.render('login',{message:''})
}

function post(req,res){
	var email = req.body.email,
		pwd = req.body.password;

	var ismail = validator.isEmail(email);

	if(!ismail){
		res.render('login',{message:'用户名不正确，请输入正确的邮箱'})
		return;
	}
	if(!email){
		res.render('login',{message:'请输入用户名'})
		return;
	}
	if(!pwd){
		res.render('login',{message:'请输入密码'})
		return;
	}
	pwd = md5(pwd);
	user.findOne({ email: email,password : pwd},function(err,result){
		if(err){
			res.render('login',{message:'请重新登录'})
			return;
		}
		req.session.uid = result;
		res.cookie('token', result.token, { maxAge : 365*24*60*60*1000 });
		
		var cookie = { // 等待写入 icon信息
			name : result.name
		};
		cookie = JSON.stringify(cookie);
		res.cookie('userinfo',cookie, { maxAge: 365*24*60*60*1000 });
		res.redirect('/');
	})
}

function logout(req,res){
	req.session.uid = null;
	res.clearCookie('token');
	res.redirect('/');
}

module.exports = {
	get : get,
	post : post,
	logout : logout
}