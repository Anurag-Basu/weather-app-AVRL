const input = document.getElementById('search-bar');
const searchBtn = document.querySelector('.search-btn');
const cities = document.querySelectorAll('.city');
const getWeatherBtn = document.querySelector('.get-weather');
const cityList = ["London", "New York", "Los Angeles", "Las Vegas"];
const tbodyEl = document.getElementById('get-data');
const currentDate = new Date();

function fetchWeather(){
    const inputVal = input.value.trim();

    fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${inputVal}`)
    .then(res => res.json())
    .then(data => {
        if(data.status === "failed"){
            return;
        }else{
            console.log(data)
        const weatherDate  =  currentDate - new Date(data.date_and_time);
        const weatherHours = Math.floor(weatherDate / 3600) %24;
        tbodyEl.innerHTML +=`
        <tr>
            <td>${inputVal}</td>
            <td>${data.description}</td>
            <td>${data.temp_in_celsius}</td>
            <td>${data.pressure_in_hPa}</td>
            <td>${weatherHours}</td>
            <td><button class="delete">Delete</button></td>
            
        </tr>
        `;
        tbodyEl.addEventListener('click', onDeleteRow);

     }
    })
    
    input.value = "";
        

}

function fetchAllCities(){
    tbodyEl.innerHTML = '';

    cities.forEach(city => {
        console.log(city.innerText);
        
    fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city.innerText}`)
    .then(res => res.json())
    .then(data => {
        if(data.status === "failed"){
            return;
        }else{
            console.log(data)
        const weatherDate  =  currentDate - new Date(data.date_and_time);
        const weatherHours = Math.floor(weatherDate / 3600) %24;
        tbodyEl.innerHTML +=`
        <tr>
            <td>${city.innerText}</td>
            <td>${data.description}</td>
            <td>${data.temp_in_celsius}</td>
            <td>${data.pressure_in_hPa}</td>
            <td>${weatherHours}</td>
            <td><button class="delete">Delete</button></td>
            
        </tr>
        `;
        tbodyEl.addEventListener('click', onDeleteRow);

     }
    })
    
        
    });
}




function onDeleteRow(e){
    if(!e.target.classList.contains("delete")){
        return;
    }
    const delBtn = e.target;
    delBtn.closest('tr').remove();
}



searchBtn.addEventListener('click', fetchWeather);
getWeatherBtn.addEventListener('click', fetchAllCities);

