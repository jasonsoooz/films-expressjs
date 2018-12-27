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

const createFilmTable = (table, films) => {
  // Build table header
  let filmHeaderCols = ["Year", "Title", "Imdb Rating", "Director"];
  let header = elt("thead", null);
  filmHeaderCols.forEach(elem => {
    let headerCol = elt("th", null, elem);
    header.appendChild(headerCol);
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

  let tableId = "filmsTable";
  table.setAttribute("id", tableId);
  document.getElementById(tableId).style.width = "100%";
}

const runApp = () => {
  let films = [
    {"year":2002,"title":"Spiderman","imdbRating":7.3,"director":"Sam Raimi"},
    {"year":2004,"title":"Spiderman 2","imdbRating":7.3,"director":"Sam Raimi"}
  ];
  let table = elt("table", null);
  createFilmTable(table, films);
}

// Main body
runApp();