# VizCity

VizCity is a web application designed to help people get comprehensive information about a city they plan to visit. It provides **weather updates**, **geographical data**, **news**, **currency exchange rates**, **time zone information**, and **COVID-19 statistics**.

## Features

- **Current weather information**
- Geographical data
- Latest news articles
- Currency exchange rates
- Time zone information
- COVID-19 statistics

## Installation

### Prerequisites

- Python 3.7+
- Node.js
- npm

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Bhaskar1612/VizCity.git
   cd VizCity/backend
   ```

2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up environment variables for API keys in a `.env` file:
   ```env
   API_KEY1=your_openweathermap_api_key
   API_KEY2=your_opencagedata_api_key
   API_KEY3=your_newsapi_api_key
   API_KEY4=your_openexchangerates_api_key
   API_KEY5=your_timezonedb_api_key
   ```

5. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install the required packages:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm start
   ```

### Usage
- Open your browser and navigate to `http://localhost:3000`.
- Enter the name of the city you want information about.
- Get comprehensive information about the city, including weather, news, and more.

## API Endpoints
The backend uses the following API endpoints to fetch data:

- Weather Information: `http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY1}`
- Geographical Data: `https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={API_KEY2}`
- News Articles: `https://newsapi.org/v2/everything`
- Currency Exchange Rates: `https://openexchangerates.org/api/latest.json?app_id={API_KEY4}`
- Time Zone Information: `http://api.timezonedb.com/v2.1/list-time-zone?key={API_KEY5}&format=json&country={country}`
- COVID-19 Statistics: `https://disease.sh/v3/covid-19/countries/{Country}`

## Technologies Used
- Backend: FastAPI, Python
- Frontend: React.js, HTML, CSS, JavaScript
- Middleware: CORSMiddleware

### APIs:
- OpenWeatherMap API
- OpenCageData API
- NewsAPI
- OpenExchangeRates API
- TimeZoneDB API
- Disease.sh API

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
5. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
6. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Bhaskar - bhaskarkashyap1612@gmail.com

## Project Link: [https://github.com/Bhaskar1612/VizCity](https://github.com/Bhaskar1612/VizCity)
