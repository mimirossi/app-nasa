let sectionOfTheDay = document.querySelector("#section");
let detailsOfTheDay = document.querySelector("#details");
let articleOfTheDay = document.querySelector("#article-of-the-day");
let picOfTheDay = document.querySelector("#pic-of-the-day");
let titleOfTheDay = document.querySelector("#title-of-the-day");
let DetailsOfTheDay = document.querySelector("#details-of-the-day");
let DescriptionOfTheDay = document.querySelector("#description-of-the-day");
let ArtistOfTheDay = document.querySelector("#artist-of-the-day");
let ContainerGallery = document.querySelector("#container-gallery");

let dateMill = Date.now();
let days = convertDaysInMillis(12);
let startMill = dateMill - days;
function convertDaysInMillis(numberOfDays) {
  return numberOfDays * 24 * 60 * 60 * 1000;
}
function formatDate(millis) {
  let date = new Date(millis);
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  // Ritorno la stringa formulata correttamente
  return `${year}-${month}-${day}`;
  // let year = date.getFullYear();
  // let month = date.getMonth() + 1;
  // let day = date.getDate();
  // return `${year}-${month}-${day}`;
}
let end = formatDate(dateMill);
let start = formatDate(startMill);
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let day = date.getDate();
// let todayDate = `${year}-${month}-${day}`;
const APIKEY = "nUUwEjG2l0a7DiYwbc89bfsQ33NFLtKoZoFQIgoe";
const APODURL = `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&start_date=${start}&end_date=${end}&thumbs=true`;

fetch(APODURL)
  .then((res) => res.json())
  .then((pic) => loadpicOfTheDay(pic));
// .then((pic) => console.log(pic));

function loadpicOfTheDay(pic) {
  titleOfTheDay = checkTitle(pic);
  DescriptionOfTheDay.textContent = pic.explanation;
  ArtistOfTheDay.textContent = pic.copyright;
  picOfTheDay.src = checkMediaType(pic);
  // picOfTheDay.src = pic.url;
  DetailsOfTheDay.append(ArtistOfTheDay);
  DetailsOfTheDay.append(DescriptionOfTheDay);
  DetailsOfTheDay.append(titleOfTheDay);
  articleOfTheDay.append(picOfTheDay);
}
function checkMediaType(pic) {
  if (pic.media_type === "image") {
    return pic.url;
  } else if (pic.media_type === "video") {
    return pic.thumbnail_url;
  }
  // else {
  //   pic.innerHTML = `<h2 class="title-section">Picture Not Available</h2>`;
  // }
}
function checkTitle(pic) {
  if (pic.title) {
    titleOfTheDay.textContent = pic.title;
  } else {
    titleOfTheDay.textContent = "Titolo non Disponibile";
  }
}
// function loadGallery(pic) {
//   let picContainer = document.createElement("img");
// }
