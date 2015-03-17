var admin_id = '550292cfa0bed4a80b2a9b64', // 管理员id,目前仅允许管理员发布，编辑文章,嗯，我的博客我做主
	model = require('../model/index'),
	user = model.User;

function author(req,res,next) {
	var token = req.cookies.token;
	if(req.session && req.session.uid){
		if(admin_id != req.session.uid._id){
			res.redirect('/');
			return;
		}
		next();
		return;
	}

	res.redirect('/login');
}

module.exports = author;