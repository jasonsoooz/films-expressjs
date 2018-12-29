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


function handleDelete(year, title, imdbRating, director) {
  console.log("year: %s, title: %s, imdbRating: %s, director: %s", year, title, imdbRating, director);
}


const displayFilmTable = (displayCols, films) => {
  let table = elt("table", {style: "width: 100%"});

  // Build table header
  let header = elt("thead", null);
  displayCols.forEach(elem => {
    header.appendChild(elt("th", null, elem));
  });
  table.appendChild(header);

  let filmNumber = 1;
  // Build table body
  films.forEach(elem => {
    let row = table.insertRow();
    let cell = row.insertCell(0);
    cell.innerHTML = filmNumber.toString();
    let cell1 = row.insertCell(1);
    cell1.innerHTML = elem.year;
    let cell2 = row.insertCell(2);
    cell2.innerHTML = elem.title;
    let cell3 = row.insertCell(3);
    cell3.innerHTML = elem.imdbRating;
    let cell4 = row.insertCell(4);
    cell4.innerHTML = elem.director;
    let cell5 = row.insertCell(5);
    cell5.innerHTML = `<button type="button" onclick="handleDelete('${elem.year}', '${elem.title}', '${elem.imdbRating}', '${elem.director}')">Delete</button>`;
    filmNumber++;
  });

  document.body.appendChild(table);
}


// synchronous / blocking sleep
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


const handleSubmit = (event) => {
  let year = event.target.elements["Year"].value;
  let title = event.target.elements["Title"].value;
  let imdbRating = event.target.elements["Imdb Rating"].value;
  let director = event.target.elements["Director"].value;
  console.log("year: %s, title: %s, imdbRating: %s, director: %s", year, title, imdbRating, director);

  fetch('/films', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({year: year, title: title, imdbRating: imdbRating, director: director})
  })
    .catch(error => console.log(error));

  // Weird that firefox needs a blocking delay for post to work.
  // It logs an error that can be ignored:
  //   "TypeError: NetworkError when attempting to fetch resource"
  // Chrome works cleanly without sleep
  sleep(100);
}


const displayForm = (formCols) => {
  document.body.appendChild(elt("h2", null, "Submit a film"));

  let form = elt("form", {onsubmit: handleSubmit});
  formCols.forEach(elem => {
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
  let displayCols = ["No", "Year", "Title", "Imdb Rating", "Director", "Actions"];
  let formCols = ["Year", "Title", "Imdb Rating", "Director"];

  displayFilmTable(displayCols, films);
  displayForm(formCols);
}


// Main body
runApp();