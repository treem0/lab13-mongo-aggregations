const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  Year: Number,
  Title: String,
  Subject: String,
  Actor: String,
  Actress: String,
  Director: String,
  Popularity: Number
});
  
module.exports = mongoose.model('Film', schema);
