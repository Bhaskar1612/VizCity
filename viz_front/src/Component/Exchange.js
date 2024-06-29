import React, { useState } from 'react';
import axios from 'axios';
import './Exchange.css';

const Exchange = () => {
  const [rates, setRates] = useState([]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Global_Currency_Exchange/');
      setRates(Object.entries(response.data.rates));
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setRates([]);
    }
  };

  return (
    <div className="Exchange">
      <div className="container">
        <h1>Global Currency Exchange Rates</h1>
        <button onClick={fetchExchangeRates}>Fetch Exchange Rates</button>
        <div className="rates-container">
          <ul>
            {rates.map(([currency, rate], index) => (
              <li key={currency}>
                <strong>{index + 1}.</strong> {currency}: {rate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
