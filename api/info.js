var model = require('../model/index'),
	mk = require('markdown').markdown,
	moment = require('moment'),
	article = model.Article;


function info(req,res){
	var gid = req.params.gid;

	article.findOne({ _id : gid },function(err,articles){
		articles._content = mk.toHTML(articles.content);
		articles._date = moment(articles.date).format('YYYY-MM-DD');
		res.render('info',articles);
	})

}
module.exports = info;
