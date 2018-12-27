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


const submitClick = (event) => {
  let year = event.target.elements["Year"].value;
  let title = event.target.elements["Title"].value;
  let imdbRating = event.target.elements["Imdb Rating"].value;
  let director = event.target.elements["Director"].value;

  console.log("year: %s, title: %s, imdbRating: %s, director: %s", year, title, imdbRating, director);

  (async () => {
    const rawResponse = await fetch('/films', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({year:year,title:title,imdbRating:imdbRating,director:director})
    }).catch(error => console.log(error));
    const content = await rawResponse.json();
    console.log("Post content");
    console.log(content);
  })();
  alert("Film submitted");
  // setTimeout(console.log("hi"), 1000);
}


const displayForm = (filmCols) => {
  document.body.appendChild(elt("h2", null, "Submit a film"));

  let form = elt("form", {onsubmit: submitClick});
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
  let filmCols = ["Year", "Title", "Imdb Rating", "Director"];

  displayFilmTable(filmCols, films);
  displayForm(filmCols);
}


// Main body
runApp();