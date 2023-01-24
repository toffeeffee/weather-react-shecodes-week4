import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [lat, setLatitude] = useState(null);
  let [lon, setLongitude] = useState(null);
  let [wind, setWind] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [description, setDescription] = useState("");
  let [icon, setIcon] = useState("");
  let [dateNow, setDateNow] = useState({ ready: false });

  function setTemperatureAndCoordinates(response) {
    setTemperature(response.data.main.temp);
    setLongitude(response.data.coord.lon);
    setLatitude(response.data.coord.lat);
  }

  let api = "b35c686ba9565ba0ab254c2230937552";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
  axios.get(url).then(setTemperatureAndCoordinates);
  let urlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
  axios.get(urlCoord).then(getWeater);

  function getWeater(response) {
    setDateNow(new Date(response.data.dt*1000));
    setWind(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }


  function submitSearch(event) {
    event.preventDefault();
    let div = document.querySelector(".forecast");

    if (city.length > 0) {
      // setTemperature(`Temperature: ${Math.round(temperature)}°C in ${city}`);
      city = capitalizeFirstLetter(city);
     // let text = dateNow;
     // let dataInput = text.substring(0, 21);

      div.innerHTML = `
      <div class="row">
        <div class="col-6">
          <h4>${city}</h4>
          <div class="dat"> ${dateNow.toString().substring(0, 21)}</div>
          <img src="${icon}" alt="Clear" id="icon" />
        </div>
        <div class="col-6">
          <div class="temperature"><span>${Math.round(temperature)}</span><a href="#" id="celc">°C</a><a href="#" id="faran"> | F</a></div>
          <div class="describe">Wind: <span>${wind} km/h </span></div>
          <div class="describe">Humidity: <span>${humidity} % </span></div>
          <div class="describe">${description}</div>
        </div>
      </div> `;
    } else {
      div.innerHTML = "Enter a city";
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  return (
    <form onSubmit={submitSearch}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <input type="submit" value="Search" className="searchBtn"/>
    </form>
  );
}
