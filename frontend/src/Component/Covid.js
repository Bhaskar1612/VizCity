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
      console.log(covidData);
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
            <h2>COVID-19 Data for {covidData["country"]}</h2>
            <h3><strong>Updated:</strong> {new Date(covidData["updated"]).toLocaleString()}</h3>
            <h3><strong>Country:</strong> {covidData["country"]}</h3>
            <h3><strong>ISO2:</strong> {covidData.countryInfo.iso2}</h3>
            <h3><strong>ISO3:</strong> {covidData.countryInfo.iso3}</h3>
            <h3><strong>Latitude:</strong> {covidData.countryInfo.lat}</h3>
            <h3><strong>Longitude:</strong> {covidData.countryInfo.long}</h3>
            <img src={covidData.countryInfo.flag} alt={`${covidData.country} flag`} />
            <h3><strong>Cases:</strong> {covidData.cases}</h3>
            <h3><strong>Today Cases:</strong> {covidData.todayCases}</h3>
            <h3><strong>Deaths:</strong> {covidData.deaths}</h3>
            <h3><strong>Today Deaths:</strong> {covidData.todayDeaths}</h3>
            <h3><strong>Recovered:</strong> {covidData.recovered}</h3>
            <h3><strong>Today Recovered:</strong> {covidData.todayRecovered}</h3>
            <h3><strong>Active:</strong> {covidData.active}</h3>
            <h3><strong>Critical:</strong> {covidData.critical}</h3>
            <h3><strong>Cases Per One Million:</strong> {covidData.casesPerOneMillion}</h3>
            <h3><strong>Deaths Per One Million:</strong> {covidData.deathsPerOneMillion}</h3>
            <h3><strong>Tests:</strong> {covidData.tests}</h3>
            <h3><strong>Tests Per One Million:</strong> {covidData.testsPerOneMillion}</h3>
            <h3><strong>Population:</strong> {covidData.population}</h3>
            <h3><strong>Continent:</strong> {covidData.continent}</h3>
            <h3><strong>One Case Per People:</strong> {covidData.oneCasePerPeople}</h3>
            <h3><strong>One Death Per People:</strong> {covidData.oneDeathPerPeople}</h3>
            <h3><strong>One Test Per People:</strong> {covidData.oneTestPerPeople}</h3>
            <h3><strong>Active Per One Million:</strong> {covidData.activePerOneMillion}</h3>
            <h3><strong>Recovered Per One Million:</strong> {covidData.recoveredPerOneMillion}</h3>
            <h3><strong>Critical Per One Million:</strong> {covidData.criticalPerOneMillion}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Covid;
