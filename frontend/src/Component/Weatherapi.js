import axios from "axios";
import React, { useState } from 'react';
import './Weatherapi.css';

const Weatherapi = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/weather/${cityName}`);
      setWeatherData(response.data);
      setError(null);
    }
    catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      }
      else {
        setError('An error occurred while fetching weather data.');
      }
      setWeatherData(null);
    }
  };

    return (
        <div className ="weather-container">
            <div className="input-container">
             <label>City Name:</label>
             <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            </div>
            <button onClick={fetchWeatherData}>Collect</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
             <div className="result">
              <h2>Weather Information for {cityName}</h2>
              <p>Temperature: {weatherData.main.temp} K</p>
              <p>Min: {weatherData.main.temp_min}K</p>
              <p>Max: {weatherData.main.temp_max}K</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Pressure: {weatherData.main.pressure}Pa</p>
              <p>Wind: {weatherData.wind.speed}%</p>
             </div>
            )}

        </div>
    )
}

export default Weatherapi;