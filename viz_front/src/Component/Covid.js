import React, { useState } from 'react';
import axios from 'axios';
import './Covid.css';

const Covid = () => {
  const [country, setCountry] = useState('');
  const [covidData, setCovidData] = useState(null);

  const fetchCovidData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Covid_19/', {
        params: { Country: country }
      });
      setCovidData(response.data);
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
      setCovidData(null);
    }
  };

  return (
    <div className="Covid">
      <div className="container">
        <h1>COVID-19 Data by Country</h1>
        <div className="form-container">
          <div className="form-group">
            <label>
              Country:
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
          </div>
          <button onClick={fetchCovidData}>Fetch COVID-19 Data</button>
        </div>
        {covidData && (
          <div className="data-container">
            <h2>COVID-19 Data for {covidData.country}</h2>
            <p><strong>Updated:</strong> {new Date(covidData.updated).toLocaleString()}</p>
            <p><strong>Country:</strong> {covidData.country}</p>
            <p><strong>ISO2:</strong> {covidData.countryInfo.iso2}</p>
            <p><strong>ISO3:</strong> {covidData.countryInfo.iso3}</p>
            <p><strong>Latitude:</strong> {covidData.countryInfo.lat}</p>
            <p><strong>Longitude:</strong> {covidData.countryInfo.long}</p>
            <img src={covidData.countryInfo.flag} alt={`${covidData.country} flag`} />
            <p><strong>Cases:</strong> {covidData.cases}</p>
            <p><strong>Today Cases:</strong> {covidData.todayCases}</p>
            <p><strong>Deaths:</strong> {covidData.deaths}</p>
            <p><strong>Today Deaths:</strong> {covidData.todayDeaths}</p>
            <p><strong>Recovered:</strong> {covidData.recovered}</p>
            <p><strong>Today Recovered:</strong> {covidData.todayRecovered}</p>
            <p><strong>Active:</strong> {covidData.active}</p>
            <p><strong>Critical:</strong> {covidData.critical}</p>
            <p><strong>Cases Per One Million:</strong> {covidData.casesPerOneMillion}</p>
            <p><strong>Deaths Per One Million:</strong> {covidData.deathsPerOneMillion}</p>
            <p><strong>Tests:</strong> {covidData.tests}</p>
            <p><strong>Tests Per One Million:</strong> {covidData.testsPerOneMillion}</p>
            <p><strong>Population:</strong> {covidData.population}</p>
            <p><strong>Continent:</strong> {covidData.continent}</p>
            <p><strong>One Case Per People:</strong> {covidData.oneCasePerPeople}</p>
            <p><strong>One Death Per People:</strong> {covidData.oneDeathPerPeople}</p>
            <p><strong>One Test Per People:</strong> {covidData.oneTestPerPeople}</p>
            <p><strong>Active Per One Million:</strong> {covidData.activePerOneMillion}</p>
            <p><strong>Recovered Per One Million:</strong> {covidData.recoveredPerOneMillion}</p>
            <p><strong>Critical Per One Million:</strong> {covidData.criticalPerOneMillion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Covid;
