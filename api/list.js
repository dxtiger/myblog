var model = require('../model/index'),
	article = model.Article,
	async = require('async'),
	moment = require('moment'),
	mk = require('markdown').markdown,
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
		var i=results.items.length-1,data=[];
		for(;i>=0;i--){
			data[i]=results.items[i];
			data[i]['_date'] = moment(new Date(results.items[i].date)).format('YYYY-MM-DD');
			data[i]['_content'] = mk.toHTML(results.items[i].content);
		}
		res.render('list',{
			items : data,
			pre : Math.max(0,n-1),
			next : Math.min(m,n+1)
		})
	})

}

module.exports = list;
