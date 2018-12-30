'use strict';

const request = require('supertest');
const app = require('../server');
const {expect} = require('chai');

// For manual testing:
// curl -d '{"year":2002,"title":"Spiderman","imdbRating":7.3,"director":"Sam Raimi"}' -H "Content-Type: application/json" -X POST http://localhost:8020/films
// curl -d 'year=2002&title=Spiderman&imdbRating=7.3&director=Sam%20Raimi' -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8020/films
describe('POST /films', function () {
  it('respond with 201 created', (done) => {
    request(app)
      .post('/films')
      .send({year:"2002", title: "Spiderman", imdbRating: "7.3", director:"Sam Raimi"})
      .set('Accept', 'application/json')
      .expect(201)
      .then(res => {
        expect(res.body).to.equal('film added');
        done();
      });
  });

  it('respond with 400 when mandatory film title is missing', (done) => {
    request(app)
      .post('/films')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .then(res => {
        expect(res.body).to.equal('Mandatory title is missing, film not added');
        done();
      });
  });
});

// Need to be after POST as it's asserting GET film added from post
describe('GET /films', () => {
  it('responds with json films', () => {
    return request(app)
      .get('/films')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body[0].year).to.equal('2002');
        expect(res.body[0].title).to.equal('Spiderman');
        expect(res.body[0].imdbRating).to.equal('7.3');
        expect(res.body[0].director).to.equal('Sam Raimi');
      })
  });
});

// For manual testing:
// curl -d '{"year":2002,"title":"Spiderman","imdbRating":7.3,"director":"Sam Raimi"}' -H "Content-Type: application/json" -X DELETE http://localhost:8020/films/Spiderman
describe('DELETE /films/title', function () {
  const film = {year:"2002", title: "Spiderman", imdbRating: "7.3", director:"Sam Raimi"};
  it('respond with 204 deleted', (done) => {
    request(app)
      .delete('/films/Spiderman')
      .send(film)
      .set('Accept', 'application/json')
      .expect(204)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 404 not found when title not passed into delete', (done) => {
    request(app)
      .delete('/films')
      .send(film)
      .set('Accept', 'application/json')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});