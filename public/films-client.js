"use strict";

const elt = (type, props, ...children) => {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

const displayFilmTable = (filmCols, films) => {
  let table = elt("table", {style: "width: 100%"});

  // Build table header
  let header = elt("thead", null);
  filmCols.forEach(elem => {
    header.appendChild(elt("th", null, elem));
  });
  table.appendChild(header);

  // Build table body
  films.forEach(elem => {
    let row = table.insertRow();
    let cell = row.insertCell(0);
    cell.innerHTML = elem.year;
    let cell1 = row.insertCell(1);
    cell1.innerHTML = elem.title;
    let cell2 = row.insertCell(2);
    cell2.innerHTML = elem.imdbRating;
    let cell3 = row.insertCell(3);
    cell3.innerHTML = elem.director;
  });

  document.body.appendChild(table);
}

const runApp = () => {
  let films = [
    {"year":2002,"title":"Spiderman","imdbRating":7.3,"director":"Sam Raimi"},
    {"year":2004,"title":"Spiderman 2","imdbRating":7.3,"director":"Sam Raimi"}
  ];
  let filmCols = ["Year", "Title", "Imdb Rating", "Director"];
  displayFilmTable(filmCols, films);
}

// Main body
runApp();