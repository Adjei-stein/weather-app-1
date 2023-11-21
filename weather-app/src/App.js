import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clearSky from './img/day-time-clear-sky.jpg';
import fewClouds from './img/day-time-few-clouds.jpg';
import scatteredClouds from './img/broken.jpeg';
import brokenClouds from './img/broken.jpeg';
import overcastClouds from './img/night-time-overcast-clouds-.jpg';
import mist from './img/mist-day-time-2.jpg';
import fog from './img/fog-day-time.jpg';
import rain from './img/rainy.jpg';
import drizzle from './img/rainy.jpg';
import thunderstorm from './img/thunderstorm.jpeg';
import snow from './img/snow.jpg';
import hail from './img/hail.jpg';
import sleet from './img/sleet.jpg';
import tornado from './img/tornado.jpg';
import lightRain from './img/rainy.jpg';
import clearSkyPng from './img/icons8-clear-sky-96.png';
import cloudsPng from './img/icons8-cloud-100.png';
import fogPng from './img/icons8-fog-100.png';
import sleetPng from './img/icons8-sleet-90.png';
import snowPng from './img/icons8-snow-100-1.png';
import rainPng from './img/icons8-rain-100-1.png';
import hailPng from './img/icons8-hail-100.png';
import tornadoPng from './img/icons8-tornado-100.png';
import thunderstormPng from './img/icons8-thunderstorm-100.png';
import mainBackgroundPic from './img/overcast-clouds-day-time.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './header/header.js';
import BodyRowOneComponent from './body_row_one/bodyOne.js'
//import TemperatureTimelineChart from './temp_chart/temp_chart.js';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);


  const API_KEY = '50abf0878f47f23b69a01d552feb8404';

  const defaultWeatherName = 'Default City';
  const defaultWeatherCountry = 'Default Country';

  const getWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

       // Fetch hourly forecast
       const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=40`
        );
  
      console.log("response -------------------------", response.data)

      // Extract relevant hourly forecast data
      const hourlyData = forecastResponse.data.list.map((data) => ({
        hour: new Date(data.dt * 1000).getHours(),
        temperature: data.main.temp,
        description: data.weather[0].description,
      }));

      const dailyData = forecastResponse.data.list.filter((data, index) => index % 8 === 0);

        setForecastData(dailyData);

      // Set hourly forecast
      setHourlyForecast(hourlyData);
      setSunrise(response.data.sys.sunrise);
      setSunset(response.data.sys.sunset);
  
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.log("Here wai")
      setWeather(null);
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleTemperatureUnit = (temp) => {
    // Convert temperature from Kelvin to Celsius
    return Math.round(temp - 273.15);
  };

  /* const getDay = (timestamp, timezoneOffset) => {
    const localTimeInMilliseconds = timestamp * 1000;
    const localDateTime = new Date(localTimeInMilliseconds + timezoneOffset * 1000);
    const options = { weekday: 'long' };
    return localDateTime.toLocaleString(undefined, options);
  }; */
  
  const getTime = (timestamp, timezoneOffset) => {
    const localTimeInMilliseconds = timestamp * 1000;
    const localDateTime = new Date(localTimeInMilliseconds + timezoneOffset * 1000);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return localDateTime.toLocaleString(undefined, options);
  };

  const calculateLocalTime = (timestamp, timezoneOffset) => {
    const localTimeInMilliseconds = timestamp * 1000;
    const localDateTime = new Date(localTimeInMilliseconds + timezoneOffset * 1000);
    return localDateTime.toLocaleString();
  };

  const getCurrentDate = (timestamp, timezoneOffset) => {
    const localTimeInMilliseconds = timestamp * 1000;
    const localDateTime = new Date(localTimeInMilliseconds + timezoneOffset * 1000);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return localDateTime.toLocaleDateString(undefined, options);
  };


  // Map weather descriptions to corresponding background images
  const weatherBackgrounds = {
    'clear sky': require('./img/day-time-clear-sky.jpg').default,
    'few clouds': require('./img/day-time-few-clouds.jpg').default,
    'scattered clouds': require('./img/broken.jpeg').default,
    'broken clouds': require('./img/broken.jpeg').default,
    'overcast clouds': require('./img/night-time-overcast-clouds-.jpg').default,
    'light rain': require('./img/rainy.jpg').default,
    mist: require('./img/mist-day-time-2.jpg').default,
    fog: require('./img/fog-day-time.jpg').default,
    rain: require('./img/rainy.jpg').default,
    drizzle: require('./img/rainy.jpg').default,
    thunderstorm: require('./img/thunderstorm.jpeg').default,
    snow: require('./img/snow.jpg').default,
    hail: require('./img/hail.jpg').default,
    sleet: require('./img/sleet.jpg').default,
    tornado: require('./img/tornado.jpg').default,
  };

  const getBackgroundImage = () => {
    if (weather && weather.weather[0].description.toLowerCase() in weatherBackgrounds) {
      console.log('weather.weather[0].description.toLowerCase() is++++++++++++', weather.weather[0].description.toLowerCase())
      if (weather.weather[0].description.toLowerCase() === 'clear sky'){
          return clearSky;
      }
      else if (weather.weather[0].description.toLowerCase() === 'few clouds'){
        return fewClouds
      }
      else if (weather.weather[0].description.toLowerCase() === 'scattered clouds'){
        return scatteredClouds;
      }
      else if (weather.weather[0].description.toLowerCase() === 'broken clouds'){
        return brokenClouds;
      }
      else if (weather.weather[0].description.toLowerCase() === 'overcast clouds'){
        return overcastClouds;
      }
      else if (weather.weather[0].description.toLowerCase() === 'light rain'){
        return lightRain
      }
      else if (weather.weather[0].description.toLowerCase() === 'mist'){
        return mist;
      }
      else if (weather.weather[0].description.toLowerCase() === 'fog'){
        return fog;
      }
      else if (weather.weather[0].description.toLowerCase() === 'rain'){
        return rain;
      }
      else if (weather.weather[0].description.toLowerCase() === 'drizzle'){
        return drizzle;
      }
      else if (weather.weather[0].description.toLowerCase() === 'thunderstorm'){
        return thunderstorm;
      }
      else if (weather.weather[0].description.toLowerCase() === 'snow'){
        return snow;
      }
      else if (weather.weather[0].description.toLowerCase() === 'hail'){
        return hail;
      }
      else if (weather.weather[0].description.toLowerCase() === 'sleet'){
        return sleet;
      }
      else if (weather.weather[0].description.toLowerCase() === 'tornado'){
        return tornado;
      }
      else {
        return fewClouds;
      }
      
      /* console.log('weather.weather[0].description.toLower==() is++++++++++++', weather.weather[0].description.toLowerCase())
      return `url(${weatherBackgrounds[weather.weather[0].description.toLowerCase()]})`; */
    }
    else {
      return clearSky;
    }
    // Default background if no match found
    //return 'url(./img/day-time-clear-sky.jpg)';
  };


  const getWeatherPng = () => {
    if (weather && weather.weather[0].description.toLowerCase() in weatherBackgrounds) {
      console.log('weather.weather[0].description.toLowerCase() is++++++++++++', weather.weather[0].description.toLowerCase())
      if (weather.weather[0].description.toLowerCase() === 'clear sky' || weather.weather[0].description.toLowerCase() === 'few clouds'){
          return clearSkyPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'scattered clouds' || weather.weather[0].description.toLowerCase() === 'broken clouds' || weather.weather[0].description.toLowerCase() === 'overcast clouds'){
        return cloudsPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'light rain' || weather.weather[0].description.toLowerCase() === 'rain' || weather.weather[0].description.toLowerCase() === 'drizzle'){
        return rainPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'mist' || weather.weather[0].description.toLowerCase() === 'fog'){
        return fogPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'thunderstorm'){
        return thunderstormPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'snow'){
        return snowPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'hail'){
        return hailPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'sleet'){
        return sleetPng;
      }
      else if (weather.weather[0].description.toLowerCase() === 'tornado'){
        return tornadoPng;
      }
      else {
        return clearSkyPng;
      }
    }
    else {
      return clearSkyPng;
    }
  };


  const getWeatherPngTwo = (weatherDescription) => {
    if (weatherDescription) {
      
      if (weatherDescription === 'clear sky' || weatherDescription === 'few clouds'){
          return clearSkyPng;
      }
      else if (weatherDescription === 'scattered clouds' || weatherDescription === 'broken clouds' || weatherDescription === 'overcast clouds'){
        return cloudsPng;
      }
      else if (weatherDescription === 'light rain' || weatherDescription === 'rain' || weatherDescription === 'drizzle'){
        return rainPng;
      }
      else if (weatherDescription === 'mist' || weatherDescription === 'fog'){
        return fogPng;
      }
      else if (weatherDescription === 'thunderstorm'){
        return thunderstormPng;
      }
      else if (weatherDescription === 'snow'){
        return snowPng;
      }
      else if (weatherDescription === 'hail'){
        return hailPng;
      }
      else if (weatherDescription === 'sleet'){
        return sleetPng;
      }
      else if (weatherDescription === 'tornado'){
        return tornadoPng;
      }
      else {
        return clearSkyPng;
      }
    }
    else {
      return clearSkyPng;
    }
  };


  useEffect(() => {
    if (weather) {
      console.log('Local Time:', calculateLocalTime(weather.dt, weather.timezone));
    }
  }, [weather]);

  useEffect(() => {
    // Fetch weather for London when the component mounts
    const fetchLondonWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
        );

        // Fetch hourly forecast
       const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}&cnt=40`
        );
  
      console.log("response -------------------------", response.data)

      // Extract relevant hourly forecast data
      const hourlyData = forecastResponse.data.list.map((data) => ({
        hour: new Date(data.dt * 1000).getHours(),
        temperature: data.main.temp,
        description: data.weather[0].description,
      }));

      const dailyData = forecastResponse.data.list.filter((data, index) => index % 8 === 0);

        setForecastData(dailyData);

      // Set hourly forecast
      setHourlyForecast(hourlyData);
        setSunrise(response.data.sys.sunrise);
        setSunset(response.data.sys.sunset);
        setWeather(response.data);
        setError('');
      } catch (error) {
        setWeather(null);
        setError('Error fetching weather for London. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLondonWeather(); // Trigger the fetch for London
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App" style={{ backgroundImage: `url(${mainBackgroundPic})` }}>
      <HeaderComponent className="header" city={city}
      setCity={setCity}
      getWeather={getWeather}
      loading={loading}
      weatherName={weather ? weather.name : defaultWeatherName}
      weatherCountry={weather ? weather.sys.country : defaultWeatherCountry}
      />
      <div className="conts">
        <BodyRowOneComponent
        getCurrentDate={weather ? getCurrentDate(weather.dt, weather.timezone) : defaultWeatherName}
          getTime={weather ? getTime(weather.dt, weather.timezone) : defaultWeatherName}
          getWeatherTemp={weather ? handleTemperatureUnit(weather.main.temp) : defaultWeatherName}
          getWeatherDescription={weather ? weather.weather[0].description : defaultWeatherName}
          getWeatherPng={weather ? getWeatherPng() : clearSkyPng}
          getBackgroundImage={weather ? getBackgroundImage() : clearSky}
          weatherPressure={weather ? weather.main.pressure : defaultWeatherName}
          weatherHumidity={weather ? weather.main.humidity : defaultWeatherName}
          weatherWindSpeed={weather ? weather.wind.speed : defaultWeatherName}
          weatherVisibility={weather ? weather.visibility : defaultWeatherName}
          getSunriseTime={weather ? getTime(sunrise, weather.timezone) : defaultWeatherName}
          getSunsetTime={weather ? getTime(sunset, weather.timezone) : defaultWeatherName}
        />
        <div className="custom-row d-flex align-items-center justify-content-center">
          {forecastData && (
            <div style={{}}>
              <div className='d-flex align-items-center justify-content-center' style={{color: 'white'}}>
                <h2>The Weekly Forecast</h2>
              </div>
            
              <div className='dee d-flex align-items-center justify-content-center'>
                {forecastData.map((data) => {
                    const date = new Date(data.dt * 1000);
                    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        
                    return (
                        <div className='card cardi card-three' key={data.dt} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        height: '100%',
                        width: '60%', 
                        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                        fontWeight: 'lighter'
                      }}>
                            <div className="card-body">
                                <div className='first-row-three row_check d-flex align-items-center justify-content-center'>
                                    <h6 className='staticcountry'>{dayOfWeek}</h6>
                                </div>
                                <div className='second-row-three row_check d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(data.weather[0].description)} alt='' className='cardiotpng'/>
                                
                                </div>
                                <div className='third-row-three row_check d-flex align-items-center justify-content-center'>
                                    <h6 className='staticcountry'>{Math.round(data.main.temp - 273.15)}&deg;C</h6>
                                </div>
                            </div>
                        </div>
                    );
                })}

              </div>
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
