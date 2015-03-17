var model = require('../model/index'),
	article = model.Article;


function get(req,res){
	res.render('add',{title:'',message:'',content:'',tags:''})
}

function post(req,res){
	var title = req.body.title,
		gid = req.body.gid,
		content = req.body.content,
		tags = req.body.tag,
		art;
	
	if(gid){
		//update
		article.update({_id : gid},{title : title,content: content,tags : tags},function(err){
			res.redirect('/');
		})
	}else{
		art = new article();
		art.title = title;
		art.content = content;
		art.tags = tags.split(' ');
		art.save(function(){
			res.redirect('/');
		})
	}
}

function edit(req,res){
	var gid = req.params.gid;
	article.findOne({_id : gid},function(err,result){
		res.render('edit',result);
	})
}

function edit_post(req,res){
	var title = req.body.title,
		gid = req.body.gid,
		content = req.body.content,
		tags = req.body.tag,
		art;
	if(gid){
		article.update({_id : gid},{title : title,content: content,tags : tags},function(err){
			res.redirect('/');
		})
	}else{
		art = new article();
		art.title = title;
		art.content = content;
		art.tags = tags.split(' ');
		art.save(function(){
			res.redirect('/');
		})
	}
}

function del(req,res){
	var gid = req.params.gid;
	article.remove({_id : gid},function(err){
		res.redirect('/');
	})
}

module.exports = {
	get : get,
	post : post,
	edit : edit,
	del : del
}
