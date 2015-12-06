var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  narrative: String,
  deaths: Number,
  location: String,
  created_at: Date,
  updated_at: Date
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;