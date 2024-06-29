import React, { useState } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [city, setCity] = useState('');
  const [articles, setArticles] = useState([]);

  const handleFetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/news/${city}`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
    }
  };

  return (
    <div className="News">
      <div className="container">
        <h1>News by City</h1>
        <div className="form-container">
          <div className="form-group">
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleFetchNews}>Fetch News</button>
        </div>
        <div className="result-container">
          <h2>Articles</h2>
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                <h3>{index+1}. {article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default News;
