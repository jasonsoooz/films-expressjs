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


const displayForm = (filmCols) => {
  document.body.appendChild(elt("h2", null, "Submit a film"));

  let form = elt("form", {action: "/films", method:"post"});
  filmCols.forEach(elem => {
    form.appendChild(elt("label", null, elem + ":"));
    form.appendChild(elt("br", null));
    let inputText = elt("input", {type: "text", name: elem});
    form.appendChild(inputText);
    form.appendChild(elt("br", null));
  });

  let submitButton = elt("button", {type: "submit"}, "Submit");
  form.appendChild(submitButton);

  document.body.appendChild(form);
}


const fetchGet = (url) => {
  return fetch(url)
          .then(response => {return response.json()});
}


const runApp = async () => {
  let films = await fetchGet("/films");
  let filmCols = ["year", "title", "imdbRating", "director"];

  displayFilmTable(filmCols, films);
  displayForm(filmCols);
}


// Main body
runApp();