const csv = require('csvtojson');
const Film = require('../models/Film');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../../csv/film.csv')
    .then(films =>{
      return films.map(film => ({
        Year: film.Year,
        Title: film.Title,
        Subject: film.Subject,
        Actor: film.Actor,
        Actress: film.Actress,
        Director: film.Director,
        Popularity: film.Popularity 
      }));
    })
    .then(films => Film.create(films));
}

module.exports = {
  seedData
};
