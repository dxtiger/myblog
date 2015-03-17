var model = require('../model/index'),
	article = model.Article;


function info(req,res){
	var gid = req.params.gid;

	article.findOne({ _id : gid },function(err,articles){
		res.render('info',articles);
	})

}
module.exports = info;
