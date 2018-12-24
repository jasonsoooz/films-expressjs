"use strict";

let express = require('express')
let app = express()
let films = [
  {year:"2002", title: "Spiderman", imdbRating: "7.3", director:"Sam Raimi"}
  ];

app.get('/films', (req, res) => {
  res.json(films)
})

module.exports = app;