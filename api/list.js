var model = require('../model/index'),
	article = model.Article,
	async = require('async'),
	limit = 10;



function list(req,res){
	var n = parseInt(req.query.n) || 0,
		q = {};

	q = {
		skip : n*limit,
		limit : limit,
		sort : '-date'
	}
	function count(cb){
		article.count(function(err,max){
			cb(err,max);
		})
	}
	function find(cb){
		article.find({},{},q,function(err,articles){
			var result = articles || [];
			cb(err,result);
		})
	}
	async.auto({
		max : count,
		items : find
	},function(err,results){
		var m = Math.ceil(results.max/limit);
		res.render('list',{
			items : results.items,
			pre : Math.max(0,n-1),
			next : Math.min(m,n+1)
		})
	})

}

module.exports = list;
