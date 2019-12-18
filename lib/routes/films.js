const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) =>{
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  });
