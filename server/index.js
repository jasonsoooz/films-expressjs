"use strict";

let express = require('express')
let app = express()

let isEqual = require('lodash.isequal')

let films = [];

app.get('/films', (req, res) => {
  res.json(films)
})

// To parse request body correctly, need this line of code.
// Uses body-parser (already included in express).
// Without this, request body will not have full content as its async
app.use(express.json());

app.post('/films', (req, res) => {
  let film = req.body;
  if (film) {
    films.push(film);
    return res.status(201).json('film added');
  }
  return res.status(400).json('bad film data, film not added');
});

app.delete('/films/:title', (req, res) => {
  let film = req.body;
  if (film) {
    films = films.filter(elem => ! isEqual(film, elem));
    // 204 (No content), not supposed to send anything in response body
    return res.status(204).json();
  }
  return res.status(400).json('bad film data, film not deleted');
});

module.exports = app;