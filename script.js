const tableEl = document.querySelector("table");
const input = document.getElementById("search-bar");
const searchBtn = document.querySelector(".search-btn");
const cityEl = document.getElementById("city-list-name");
const tbodyEl = document.getElementById("get-data");
const cityName = ["London", "New York", "Los Angeles", "Las Vegas"];
const getWeatherBtn = document.querySelector(".get-weather");
const cities = document.querySelectorAll(".city");
const currentDate = new Date();

function getWeather() {
  let inputVal = input.value.trim();
  highlightCity(inputVal);

  fetch(
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${inputVal}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "failed") {
        return;
      } else {
        fetchWeather(data, inputVal);
      }
    });
  input.value = "";
}

function onDeleteRow(weather, value) {
  let index = -1;
  cities.forEach((c, i) => {
    if (c.innerText.trim() === value) {
      index = i;
      return;
    }
    return;
  });
  cities[index].classList.remove("green");
  weather.remove();
  console.log(index, "index");
  return;
}

function fetchAllCities() {
  cities.forEach((c, i) => {
    if (c.innerText.toLowerCase() === cityName[i].toLowerCase()) {
      cities[i].classList.add("green");
      return;
    }
  });

  tbodyEl.innerHTML = "";
  cityName.forEach((city) => {
    fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`)
      .then((res) => res.json())
      .then((data) => {
        fetchWeather(data, city);
      });
  });
}

function cityWeather(e) {
  const cityList = e.target.innerText;
  highlightCity(cityList);

  fetch(
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityList}`
  )
    .then((res) => res.json())
    .then((data) => {
      fetchWeather(data, cityList);
    });
}

function fetchWeather(data, value) {
  const weatherDate = currentDate - new Date(data.date_and_time);
  const weatherHours = Math.floor(weatherDate / 3600) % 24;
  const weather = document.createElement("tr");

  weather.innerHTML = `          
                <td>${value}</td>
                <td>${data.description}</td>
                <td>${data.temp_in_celsius}</td>
                <td>${data.pressure_in_hPa}</td>
                <td>${weatherHours}</td>
                <td> <button class="deleteBtn"> Delete </button> </td>
            
            `;
  const deleteBtn = weather.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    onDeleteRow(weather, value);
  });

  tbodyEl.append(weather);
}

function highlightCity(value) {
  cities.forEach((c, i) => {
    if (c.innerText === value) {
      cities[i].classList.add("green");
      return;
    }
  });
}

searchBtn.addEventListener("click", getWeather);
cityEl.addEventListener("click", cityWeather);
getWeatherBtn.addEventListener("click", fetchAllCities);
