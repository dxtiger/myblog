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

function get(req,res){
	res.render('register',{message:'',name:'',email:''})
}

function post(req,res){
	var name = req.body.name,
		email = req.body.email,
		pwd = req.body.password,
		repwd = req.body.repassword;
	var isEmail = validator.isEmail(email);

	if(!isEmail){
		res.render('register',{message:'请输入正确的邮箱',name:name,email:email});
		return;
	}
	if(pwd != repwd){
		res.render('register',{message:'两次密码不相同',name:name,email:email});
		return;
	}

	function find(){
		user.findOne({email : email},function(err,result){
			if(!result){
				create();
			}else{
				res.render('register',{message:'此邮箱已注册过，请换个邮箱',name:name,email:email});
				return;
			}
		})
	}
	function create(){
		var u = new user();
		u.name = name;
		u.email = email;
		u.token = md5(parseInt(Math.random()*10000)+pwd);
		u.password = md5(pwd);
		u.save(function(err,document){
			console.log(document)
			user.find({email : email},function(err,_result){
				console.log(_result)
				req.session.uid = _result;
				res.cookie('token', _result.token, { maxAge : 365*24*60*60*1000 });
				
				var cookie = { // 等待写入 icon信息
					name : _result.name
				};
				cookie = JSON.stringify(cookie);
				res.cookie('userinfo',cookie, { maxAge: 365*24*60*60*1000 });
				res.render('register_success');
			})

		})
	}


	find();
}

module.exports = {
	get : get,
	post : post
}