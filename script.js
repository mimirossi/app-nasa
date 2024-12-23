let sectionOfTheDay = document.querySelector("#section");
let detailsOfTheDay = document.querySelector("#details");
let articleOfTheDay = document.querySelector("#article-of-the-day");
let picOfTheDay = document.querySelector("#pic-of-the-day");
let titleOfTheDay = document.querySelector("#title-of-the-day");
let DetailsOfTheDay = document.querySelector("#details-of-the-day");
let DescriptionOfTheDay = document.querySelector("#description-of-the-day");
let ArtistOfTheDay = document.querySelector("#artist-of-the-day");
let ContainerGallery = document.querySelector("#container-gallery");
let modalWindow = document.querySelector("#modal-window");
let modalTitle = document.querySelector("#modal-title");
let modalPic = document.querySelector("#modal-picture");
let modalText = document.querySelector("#modal-text");
let modalCite = document.querySelector("#modal-copyright");
let closeButton = document.getElementsByClassName("close")[0];
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let loader = document.querySelector("#loading");
let ctx = document.querySelector("#myChart");
let ctx_due = document.querySelector("#myChart-due");

let dateMill = Date.now();
console.log(dateMill);
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
  return `${year}-${month}-${day}`;
  // let year = date.getFullYear();
  // let month = date.getMonth() + 1;
  // let day = date.getDate();
  // return `${year}-${month}-${day}`;
}
let end = formatDate(dateMill);
let start = formatDate(startMill);

const APIKEY = "nUUwEjG2l0a7DiYwbc89bfsQ33NFLtKoZoFQIgoe";
const APODURL = `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${APIKEY}&thumbs=true`;
loader.style.display = "block";
fetch(APODURL)
  .then((res) => res.json())
  .then((pic) => {
    // console.log(pic);
    loader.style.display = "none";
    loadpicOfTheDay(pic.at(-1));
    loadGallery(pic.reverse().slice(1));
  });
// .catch((error) => {
//   // Nascondi il div di caricamento anche in caso di errore
//   loader.style.display = "none";
//   console.error("Errore durante il fetch dei dati:", error);
// });
function loadpicOfTheDay(pic) {
  picOfTheDay.src = checkMediaType(pic);
  if (pic.title) {
    titleOfTheDay.textContent = pic.title;
  } else {
    titleOfTheDay.textContent = "Titolo non Disponibile";
  }
  DescriptionOfTheDay.textContent = pic.explanation;
  ArtistOfTheDay.textContent = pic.copyright;
  DetailsOfTheDay.append(titleOfTheDay);
  DetailsOfTheDay.append(DescriptionOfTheDay);
  DetailsOfTheDay.append(ArtistOfTheDay);
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
let arrayOfpics = [];
let indexArray = 0;
function loadGallery(pic) {
  pic.map((pic) => {
    let picContainer = document.createElement("div");
    let picElement = document.createElement("img");
    picElement.classList.add("pic-element");
    picElement.src = checkMediaType(pic);
    picContainer.append(picElement);
    ContainerGallery.append(picContainer);
    arrayOfpics.push(pic);
    picContainer.addEventListener("click", () => {
      showDetails(pic);
    });
  });
}
function showDetails(pic) {
  indexArray = arrayOfpics.findIndex((element) => element === pic);

  if (indexArray <= 0) {
    prev.style.display = "none";
  } else {
    prev.style.display = "block";
  }
  if (indexArray >= arrayOfpics.length - 1) {
    next.style.display = "none";
  } else {
    next.style.display = "block";
  }
  modalWindow.style.display = "block";
  modalTitle.textContent = pic.title;
  modalPic.src = checkMediaType(pic);
  modalText.textContent = pic.explanation;
  modalCite.textContent = pic.copyright;
}
closeButton.addEventListener("click", () => {
  modalWindow.style.display = "none";
});
prev.addEventListener("click", () => {
  showDetails(arrayOfpics[indexArray - 1]);
});
next.addEventListener("click", () => {
  showDetails(arrayOfpics[indexArray + 1]);
});

window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalWindow.style.display = "none";
  }
});
const MARS_DATA_URL =
  // "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";
  "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";
const MARS_DAYS = 50;
const MARS_YEAR = 668;
async function getMarsData() {
  const response = await fetch(MARS_DATA_URL);
  const marsData = await response.json();
  let lastMartianYear = marsData.soles.slice(0, MARS_DAYS).reverse();
  return lastMartianYear;
}
async function getDataofToday() {
  const response = await fetch(MARS_DATA_URL);
  const marsData = await response.json();
  let todayWeather = marsData.soles[0]; // Sol del giorno attuale
  return todayWeather;
}
async function getEveryThirtyDaysWeather() {
  const response = await fetch(MARS_DATA_URL);
  const marsData = await response.json();
  let formattedData = marsData.soles.reduce((acc, data, i) => {
    // creiamo un array più piccolo estraendo solo un oggetto ogni 30
    if (i % 30 === 0) {
      acc.push({
        label: data.sol,
        min_temp: +data.min_temp,
        max_temp: +data.max_temp,
      });
    }
    return acc;
  }, []);
  formattedData = formattedData.reverse();
  return formattedData;
}
async function updateMarsWeather() {
  let todayWeather = await getDataofToday();
  let marsWeatherElement = document.querySelector("#curiosity-text");
  marsWeatherElement.innerHTML = `
    <p>Hi from Curiosity!<br>
    This is my <strong>${todayWeather.sol}</strong> Martian day.<br>
    Today it's <strong>${todayWeather.atmo_opacity}</strong>, min temp is
    <strong>${todayWeather.min_temp}°</strong> and max temp is
    <strong>${todayWeather.max_temp}°</strong>.</p>
  `;
}
async function startProgram() {
  let marsYearData = await getMarsData();
  let descriptionMarsData = await updateMarsWeather();
  let thirtyDaysWeather = await getEveryThirtyDaysWeather();
  drawChart(marsYearData);
  drawChartDue(thirtyDaysWeather);
}
startProgram();
// function drawChartDue(thirtyDaysWeather) {
//   new Chart(ctx_due, {
//     type: "bubble",
//     data: {
//       datasets: [
//         {
//           label: "Max Temp",
//           x: 50,
//           y: 30,
//           r: 15,
//         },
//       ],
//       backgroundColor: " rgb(1, 1, 98)",
//     },
//   });
// }
function drawChart(weatherData) {
  new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Max temp",
          data: weatherData,
          borderColor: "rgb(1, 1, 98)",
          tension: 0.3,
          //linea tempeartura massima
        },
        {
          //linea temp.min
          label: "Min temp",
          data: weatherData,
          borderColor: "rgb(85, 85, 101)",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Mars'Days(sol) ",
          },
        },
        y: {
          title: {
            display: true,
            text: "Temperature in °C ",
          },
        },
      },
      //con parsing dici al porgramma quali info prendere dall'oggetto dato in data
      parsing: {
        xAxisKey: ["sol"],
        yAxisKey: ["max_temp", "min_temp"],
      },
      plugins: {
        tooltip: {
          callbacks: {
            // aggiorniamo la tooltip per mostrare l'unità di misura.
            // lo facciamo ricostruendo la stringa mostrata nella tooltip:
            // mettiamo l'etichetta del dataset, la temperatura e l'unità di misura
            label: function (ctx) {
              return `${ctx.dataset.label}: ${ctx.parsed.y} °C`;
            },
          },
        },
      },
    },
  });
}
