var model = require('../model/index'),
	mk = require('markdown').markdown,
	article = model.Article;


function info(req,res){
	var gid = req.params.gid;

	article.findOne({ _id : gid },function(err,articles){
		articles.content = mk.toHTML(articles.content);
		console.log(articles.content)
		res.render('info',articles);
	})

}
module.exports = info;
