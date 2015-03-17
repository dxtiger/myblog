var mongoose = require('mongoose'),
    ObjectId = Schema.ObjectId,
    dbname = 'tiger_blog',
    url = 'mongodb://localhost:27017/'+dbname;

mongoose.connect(url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});


// model
var Schema = mongoose.Schema;

// 文章
var ArticleSchema = new Schema({
  title:  String,
  content:   String,
  tags : [String],
  date: { type: Date, default: Date.now },
  comments: [{ 
  		content: String, 
  		date: { type: Date, default: Date.now } , 
  		name : String 
  	}]
});

// user
var UserSchema = new Schema({
	name : String,
	email : String,
	password : String,
	token : String,
	icon : String,
	date : { type:Date , default : Date.now }
})

// comments
var CommentSchema = new Schema({
  name : String,
  content : String,
  date : { type:Date , default : Date.now },
  article_id : { type : ObjectId },
  user_id : { type : ObjectId }
})

module.exports = {
  Article : mongoose.model('Artilce', ArticleSchema),
  User : mongoose.model('User',UserSchema),
  Comment : mongoose.model('Comment',CommentSchema)
}

