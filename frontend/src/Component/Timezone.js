import React, { useState } from 'react';
import axios from 'axios';
import './Timezone.css';

const Timezone = () => {
  const [countryCode, setCountryCode] = useState('');
  const [timezones, setTimezones] = useState([]);

  const fetchTimezones = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Timezones?country=${countryCode}`);
      setTimezones(response.data.zones);
    } catch (error) {
      console.error('Error fetching timezones:', error);
      setTimezones([]);
    }
  };

  return (
    <div className="Timezone">
      <div className="container">
        <h1>Timezones by Country</h1>
        <div className="form-container">
          <div className="form-group">
            <label>
              ISO 3166 Country Code:
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </label>
          </div>
          <button onClick={fetchTimezones}>Fetch Timezones</button>
        </div>
        <div className="zones-container">
          <h2>Timezones</h2>
          <ul>
            {timezones.map((zone, index) => (
              <li key={index}>
                <strong1>{index + 1}. {zone.zoneName}</strong1><br></br>
                <strong2> Timestamp: {zone.timestamp}</strong2><br></br>
                <strong3> gmtOffset: {zone.gmtOffset}</strong3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timezone;
