'use strict';

let request = require('supertest');
let app = require('../server');
let {expect} = require('chai');

describe('GET /films', () => {
  it('responds with json', () => {
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