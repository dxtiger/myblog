// 评论
var model = require('../model/index'),
	validator = require('validator'),
	comment = model.Comment,
	article = model.Article;


function add(req,res) {
	var gid = req.query.q,
		uid = req.session.uid._id,
		name = req.body.name,
		content = req.body.content;

	if(!name){
		res.jsonp({message:'请大侠留名',state:-1});
		return;
	}
	if(!content || content == '大侠，您说！'){
		res.jsonp({message:'大侠，您说点啥！',state:-1});
		return;
	}
	article.findOne({_id:gid},function(err,result){
		if(err || !result){
			res.jsonp({message:'未找到相关文章啊，大侠',state:-1});
			return;
		}
		var c = new comment();
		
		article.update({_id:gid},{ content : content , name : name },function(err){
			if(err){
				res.jsonp({message:'出错了，大侠，再试试！',state:-1});
				return;
			}
			res.jsonp({message:'',state:1});
		})
	})
}