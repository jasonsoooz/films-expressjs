'use strict';

let request = require('supertest');
let app = require('../server');
let {expect} = require('chai');

// For manual testing:
// curl -d '{"year":2002,"title":"Spiderman","imdbRating":7.3,"director":"Sam Raimi"}' -H "Content-Type: application/json" -X POST http://localhost:8020/films
// curl -d 'year=2002&title=Spiderman&imdbRating=7.3&director=Sam%20Raimi' -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8020/films
describe('POST /films', function () {
  let film = {year:"2002", title: "Spiderman", imdbRating: "7.3", director:"Sam Raimi"};
  it('respond with 201 created', (done) => {
    request(app)
      .post('/films')
      .send(film)
      .set('Accept', 'application/json')
      .expect(302)
      .end((err) => {
        if (err) return done(err);
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
  let film = {year:"2002", title: "Spiderman", imdbRating: "7.3", director:"Sam Raimi"};
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
});