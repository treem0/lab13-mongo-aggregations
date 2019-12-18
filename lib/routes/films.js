const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) =>{
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/per-year', (req, res, next) => {
    Film
      .getFilmsPerYear()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/per-subject', (req, res, next) => {
    Film
      .getFilmsPerSubject()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/per-actor', (req, res, next) => {
    Film
      .getActorNumInFilms()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/per-director', (req, res, next) => {
    Film
      .getDirectorPerFilm()
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Film
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(film => res.send(film))
      .catch(next);
  })
  .delete('/:id', (req, res, next) =>{
    Film
      .findByIdAndDelete(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  });
