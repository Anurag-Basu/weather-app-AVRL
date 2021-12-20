const tableEl = document.querySelector("table");
const input = document.getElementById("search-bar");
const searchBtn = document.querySelector(".search-btn");
const cityEl = document.getElementById("city-list-name");
const tbodyEl = document.getElementById("get-data");
const cityName = ["London", "New York", "Los Angeles", "Las Vegas"];
const getWeatherBtn = document.querySelector(".get-weather");
const currentDate = new Date();


function getWeather() {
  let inputVal = input.value.trim();
  fetch(
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${inputVal}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "failed") {
        return;
      } else {
        const weatherDate = currentDate - new Date(data.date_and_time);
        const weatherHours = Math.floor(weatherDate / 3600) %24;

        tbodyEl.innerHTML += `
            <tr>
                <td>${inputVal}</td>
                <td>${data.description}</td>
                <td>${data.temp_in_celsius}</td>
                <td>${data.pressure_in_hPa}</td>
                <td>${weatherHours}</td>
                <td> <button class="deleteBtn"> Delete </button> </td>
            </tr>
            `;

        tbodyEl.addEventListener("click", onDeleteRow);
      }
    });
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  btn.closest("tr").remove();
}

function cityWeather(e) {
  if (!e.target.classList.contains("city")) {
    return;
  }
  const cityList = e.target.innerText;

  fetch(
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityList}`
  )
    .then((res) => res.json())
    .then((data) => {
        const weatherDate = currentDate - new Date(data.date_and_time);
          const weatherHours = Math.floor(weatherDate / 3600) %24;

      tbodyEl.innerHTML += `
        <tr>
            <td>${cityList}</td>
            <td>${data.description}</td>
            <td>${data.temp_in_celsius}</td>
            <td>${data.pressure_in_hPa}</td>
            <td>${weatherHours}</td>
            <td> <button class="deleteBtn"> Delete </button> </td>
        </tr>
        `;

      tbodyEl.addEventListener("click", onDeleteRow);
    });
}

function fetchAllCities() {
  cityName.forEach((element) => {
    fetch(
      `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${element}`
    )
      .then((res) => res.json())
      .then((data) => {
          const weatherDate = currentDate - new Date(data.date_and_time);
          const weatherHours = Math.floor(weatherDate / 3600) %24;

        tbodyEl.innerHTML += `
                <tr>
                    <td>${element}</td>
                    <td>${data.description}</td>
                    <td>${data.temp_in_celsius}</td>
                    <td>${data.pressure_in_hPa}</td>
                    <td>${weatherHours}</td>
                    <td> <button class="deleteBtn"> Delete </button> </td>
                </tr>
                `;
        tbodyEl.addEventListener("click", onDeleteRow);
      });
  });
}






searchBtn.addEventListener("click", getWeather);
cityEl.addEventListener("click", cityWeather);
getWeatherBtn.addEventListener("click", fetchAllCities);



