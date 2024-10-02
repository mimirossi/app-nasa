let sectionOfTheDay = document.querySelector("section");
let detailsOfTheDay = document.querySelector("details");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let todayDate = `${year}-${month}-${day}`;
const APIKEY = "nUUwEjG2l0a7DiYwbc89bfsQ33NFLtKoZoFQIgoe";
const APODURL = `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&date=${todayDate}`;

fetch(APODURL)
  .then((res) => res.json())
  .then((info) => loadpicOfTheDay(info));

function loadpicOfTheDay(info) {
  console.log(info);
}
