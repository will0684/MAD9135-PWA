//console.log(document.querySelector("#weatherImg"));

function getData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=ottawa&APPID=fc346fc7ba887239d2dd06c5874f55c3"
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("weather").innerHTML =
        data.weather[0].description +
        ", " +
        Math.round(data.main.temp - 273.15) +
        "&#8451;";
      document.getElementById(
        "weatherImg"
      ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
    .catch(function(err) {
      console.log(err.message);
    });
}

getData();
