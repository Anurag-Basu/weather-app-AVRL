const tableEl = document.querySelector("table");
const input = document.getElementById("search-bar");
const searchBtn = document.querySelector(".search-btn");
const cityEl = document.getElementById("city-list-name");
const tbodyEl = document.getElementById("get-data");
const cityName = ["London", "New York", "Los Angeles", "Las Vegas"];
const getWeatherBtn = document.querySelector(".get-weather");
const cities = document.querySelectorAll('.city');
const currentDate = new Date();

function getWeather() {
  
  let inputVal = input.value.trim();
  
    let index = -1;
    cities.forEach((c , i) =>{
        if(c.innerText.trim().toLowerCase() === inputVal.toLowerCase()){
            index = i;
            cities[index].classList.add("green");
            return;
        }
    })

  fetch(    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${inputVal}`  )
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



        tbodyEl.addEventListener("click", (e) => onDeleteRow(e, inputVal));
      }
    });
    input.value ='';
}

var index = -1;

function onDeleteRow(e , value) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  
  const btn = e.target;
  console.log(e.target.closest('tr'))
  btn.closest("tr").remove();

  cities.forEach((c , i) =>{
      if(c.innerText.trim().toLowerCase() === value.toLowerCase()){
          index = i;
          return;
        }
        return;
      })
        cities[index].classList.remove("green");
        console.log(index , "index");        
        return;



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
    let index = -1;
    cities.forEach((c, i) => {
        if(c.innerText.toLowerCase() === cityName[i].toLowerCase()){
            index = i;
            console.log(cities[index])
            cities[index].classList.add("green");
            return;
        }
    });

    tbodyEl.innerHTML ='';
  cityName.forEach((city) => {
    fetch(
      `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
          const weatherDate = currentDate - new Date(data.date_and_time);
          const weatherHours = Math.floor(weatherDate / 3600) %24;

            

        tbodyEl.innerHTML += `
                <tr>
                    <td>${city}</td>
                    <td>${data.description}</td>
                    <td>${data.temp_in_celsius}</td>
                    <td>${data.pressure_in_hPa}</td>
                    <td>${weatherHours}</td>
                    <td> <button class="deleteBtn"> Delete </button> </td>
                </tr>
                `;
        tbodyEl.addEventListener("click",(e) => onDeleteRow(e, index));
      });
  });
}






searchBtn.addEventListener("click", getWeather);
cityEl.addEventListener("click", cityWeather);
getWeatherBtn.addEventListener("click", fetchAllCities);



