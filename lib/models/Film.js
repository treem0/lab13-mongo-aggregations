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

schema.statics.getFilmsPerYear = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$Year', 
        'filmsPerYear': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'filmsPerYear': -1
      }
    }
  ]);
};

schema.statics.getFilmsPerSubject = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$Subject', 
        'filmsPerSubject': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'filmsPerSubject': -1
      }
    }
  ]);
};

schema.statics.getActorNumInFilms = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$Actor', 
        'actorInMovies': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'actorInMovies': -1
      }
    }
  ]);
};
  
module.exports = mongoose.model('Film', schema);
