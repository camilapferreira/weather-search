import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  function showTemperature(response) {
    setLoaded(true);
    setData({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(response) {
    response.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8944afa6845bd7c413a687258d3211ef&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function searchCity(response) {
    setCity(response.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for a city"
        onChange={searchCity}
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <p>{city}</p>
        <ul>
          <li>Temperature: {Math.round(data.temperature)}°C</li>
          <li>Description: {data.description}</li>
          <li>Humidity: {data.humidity}%</li>
          <li>Wind: {data.wind}km/h</li>
          <li>
            <img src={data.icon} alt={data.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
