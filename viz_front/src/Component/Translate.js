import axios from "axios";
import React, { useState } from 'react';
import './Translate.css';

const Translate =  ()=> {
  const [language1, setLanguage1] = useState('');
  const [language2, setLanguage2] = useState('');
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Translate/', {
        params: {
          language1: language1,
          language2: language2,
          Text: text,
        },
      });
      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Translation failed.');
    }
  };

  return (
    <div className="Translate">
      <div>Hello</div>
      <div className="container">
        <h1>Translate Text</h1>
        <div className="form-container">
          <div className="form-group">
            <label>
              Original Language:
              <input
                type="text"
                value={language1}
                onChange={(e) => setLanguage1(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Target Language:
              <input
                type="text"
                value={language2}
                onChange={(e) => setLanguage2(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Text to Translate:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleTranslate}>Translate</button>
        </div>
        <div className="result-container">
          <h2>Translated Text</h2>
          <p>{translatedText}</p>
        </div>
      </div>
    </div>
  );
}
 

export default Translate;