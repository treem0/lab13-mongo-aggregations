require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const seedData = require('../lib/utils/seed-data');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  beforeEach(async() =>{
    film = await Film.create({
      Year: 1990,
      Title: 'Treemo Money',
      Subject: 'Action',
      Actor: 'Travis Molter',
      Actress: 'Emma Watson',
      Director: 'Travis Molter',
      Popularity: 1
    });
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        Year: 1990,
        Title: 'Treemo Money',
        Subject: 'Action',
        Actor: 'Travis Molter',
        Actress: 'Emma Watson',
        Director: 'Travis Molter',
        Popularity: 1
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          Year: 1990,
          Title: 'Treemo Money',
          Subject: 'Action',
          Actor: 'Travis Molter',
          Actress: 'Emma Watson',
          Director: 'Travis Molter',
          Popularity: 1,
          __v: 0
        });
      });
  });

  it('gets a film by id', () =>{
    return request(app)
      .get(`/api/v1/films/${film.id}`)
      .then(res =>{
        expect(res.body).toEqual({
          _id: expect.any(String),
          Year: 1990,
          Title: 'Treemo Money',
          Subject: 'Action',
          Actor: 'Travis Molter',
          Actress: 'Emma Watson',
          Director: 'Travis Molter',
          Popularity: 1,
          __v: 0
        });
      });
  });

  it('gets all films', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          Year: 1990,
          Title: 'Treemo Money',
          Subject: 'Action',
          Actor: 'Travis Molter',
          Actress: 'Emma Watson',
          Director: 'Travis Molter',
          Popularity: 1,
          __v: 0
        });
      });
  });

  it('updates a film', () => {
    return request(app)
      .patch(`/api/v1/films/${film.id}`)
      .send({ Title: 'Treemo Broke' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          Year: 1990,
          Title: 'Treemo Broke',
          Subject: 'Action',
          Actor: 'Travis Molter',
          Actress: 'Emma Watson',
          Director: 'Travis Molter',
          Popularity: 1,
          __v: 0
        });
      });
  });

  it('deletes a film', () => {
    return request(app)
      .delete(`/api/v1/films/${film.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          Year: 1990,
          Title: 'Treemo Money',
          Subject: 'Action',
          Actor: 'Travis Molter',
          Actress: 'Emma Watson',
          Director: 'Travis Molter',
          Popularity: 1,
          __v: 0
        });
      });
  });
});
