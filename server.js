// DEPENDENCIES

var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    port         = process.env.PORT || 3000;
    app          = express();
    mongoUri     = process.env.MONGOLAB_URI || 'mongodb://localhost/drone-data';

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// LISTENER
app.listen(port);
console.log('===== Connecting to DB ... =====', mongoUri);
mongoose.connect(mongoUri);

// Models
var User = require('./models/user');
var Article = require('./models/article');

//================
// Sign Up
//================

app.post('/users', function(req,res){

  var password_hash = md5(req.body.password);

  var user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_hash: password_hash;
  });
  console.log(user)

  user.save(function(err) {
    if (err){
      console.log(err);
      res.statusCode = 503;
    }else{

      res.cookie("loggedinId", user.id);

      res.send({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at : user.created_at
      });
    }
  });
});

//================
// Login
//================
app.post('/login', function(req,res){

  var requestEmail = req.body.email;
  var requestPassword = req.body.password;
  User.findOne({"email": requestEmail}).exec(function(err, user){
    var requestPasswordHash = md5(requestPassword);
    if( user != null && requestPasswordHash == user.password_hash){
      res.cookie("loggedinId", user.id);
      res.send({
        id: user.id,
        username: user.username;
      });
    } else {
      res.status(400);
      res.send("authorization did not work");
    }
  });

});

});

//================
// Edit user
//================

app.put('/users/:id', function(req, res){
  password_hash = md5(req.body.password_hash);
  var userEdit = {
    email: req.body.edited_email,
    username: req.body.edited_username,
    first_name: req.body.edited_first_name,
    last_name: req.body.edited_last_name,
  };

  User.findOneAndUpdate({_id: req.params.id}, userEdit, function(err,user){
    console.log(user);
    res.send(user);
  });

})


//================
// Delete user
//================


app.delete('/users/:id', function(req, res){

  User.findOneAndRemove( {_id: req.params.id},function(err){
    res.send("user deleted");
  });
});

//================
// Create articles
//================

app.post('/users/:id/articles', function(req, res){
  var article = new Article({
    title: req.body.title,
    narrative: req.body.narrative,
    deaths: req.body.deaths,
    location: req.body.location
  });
  article.save( function(err){
    if(err) {
      console.log(err);
    } else {
      res.send({
        title: article.title,
        narrative: article.narrative,
        deaths: article.deaths,
        location: article.location
      });
      User.findbyId( req.params.id).exec(function(err, user){
        user.articles.push(article);
        user.save();
      });

    };
  });
});

//================
// Delete articles
//================

app.delete('/users/:id/articles/:article_id', function(req, res){

  Article.findbyId(req.params.article_id).remove(function(err, article){
    if(err){
      console.log(err);
    }
    
  });

  User.findbyId(req.params.id).then(function(user){
    user.articles.forEach(function(article){
      if(article._id == req.params.article_id){
        var index= user.articles.indexOf(article);
        user.article.splice(index, 1);
        user.save;
        res.send(user);
      }
    });
  });
});