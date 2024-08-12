import axios from "axios";
import React, { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
    const [cityName, setCityName] = useState('');
    const [navigationData, setNavigationData] = useState(null);
    const [error, setError] = useState(null);

    const fetchNavigationData = async () => {
    try {
      setNavigationData(null);
      const response = await axios.get(`http://localhost:8000/navigation/${cityName}`);
      setNavigationData(response.data.results[0]);
      console.log(navigationData);
      
    }
    catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      }
      else {
        setError('An error occurred while fetching navigation data.');
      }
      setNavigationData(null);
    }
  };

  return (
        <div className ="navigation-container">
            <div className="input-container">
             <label>City Name:</label>
             <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            </div>
            <button onClick={fetchNavigationData}>Collect</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {navigationData && (
             <div className="result">
              <h2>Navigation Information for {navigationData.components.country}</h2>
              <pre>{JSON.stringify(navigationData ,null, 2)}</pre>
             </div>
            )}

        </div>
    )
}

export default Navigation;