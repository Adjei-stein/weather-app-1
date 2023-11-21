import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import humid from '../img/icons8-humidity-40.png';
import windSpeed from '../img/icons8-windsock-48.png';
import visible from '../img/icons8-visibility-64.png';
import pressure from '../img/icons8-pressure-64.png'; */
import clearSkyPng from '../img/icons8-clear-sky-96.png';
import cloudsPng from '../img/icons8-cloud-100.png';
import fogPng from '../img/icons8-fog-100.png';
import sleetPng from '../img/icons8-sleet-90.png';
import snowPng from '../img/icons8-snow-100-1.png';
import rainPng from '../img/icons8-rain-100-1.png';
import hailPng from '../img/icons8-hail-100.png';
import tornadoPng from '../img/icons8-tornado-100.png';
import thunderstormPng from '../img/icons8-thunderstorm-100.png';
import './bodyOne.css';




const BodyRowOneComponent = ({ getCurrentDate, getTime, getWeatherTemp, getWeatherDescription, getWeatherPng, getBackgroundImage, weatherPressure, weatherHumidity, weatherWindSpeed, weatherVisibility, getSunriseTime, getSunsetTime}) => {

    const [beijingTemperature, setBeijingTemperature] = useState(null);
    const [newYorkTemperature, setNewYorkTemperature] = useState(null);
    const [parisTemperature, setParisTemperature] = useState(null);
    const [tokyoTemperature, setTokyoTemperature] = useState(null);
    const [berlinTemperature, setBerlinTemperature] = useState(null);
    const [bangkokTemperature, setBangkokTemperature] = useState(null);
    const [beijingWeatherDescription, setBeijingWeatherDescription] = useState(null);
    const [newYorkWeatherDescription, setNewYorkWeatherDescription] = useState(null);
    const [parisWeatherDescription, setParisWeatherDescription] = useState(null);
    const [tokyoWeatherDescription, setTokyoWeatherDescription] = useState(null);
    const [berlinWeatherDescription, setBerlinWeatherDescription] = useState(null);
    const [bangkokWeatherDescription, setBangkokWeatherDescription] = useState(null);
    
    const API_KEY = '50abf0878f47f23b69a01d552feb8404';

    const fetchTemperature = async (city) => {
        try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        console.log(city, " response is ++++++++++++ ", response.data)
    

        return {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
          };
        } catch (error) {
        return `Error fetching temperature for ${city}. Please try again.`;
        }
    };

    const handleTemperatureUnit = (temp) => {
        // Convert temperature from Kelvin to Celsius
        return Math.round(temp - 273.15);
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
        const fetchData = async () => {
          const temperatureOfBeijing = await fetchTemperature('Beijing');
          const newTemperatureOfBeijing = handleTemperatureUnit(temperatureOfBeijing.temperature)
          const WeatherDescriptionOfBeijing = temperatureOfBeijing.description;
          setBeijingWeatherDescription(WeatherDescriptionOfBeijing);
          setBeijingTemperature(newTemperatureOfBeijing);
          const temperatureOfNewYork = await fetchTemperature('New York');
          const newTemperatureOfNewYork = handleTemperatureUnit(temperatureOfNewYork.temperature)
          const WeatherDescriptionOfNewYork = temperatureOfNewYork.description;
          setNewYorkWeatherDescription(WeatherDescriptionOfNewYork);
          setNewYorkTemperature(newTemperatureOfNewYork);
          const temperatureOfParis = await fetchTemperature('Paris');
          const newTemperatureOfParis = handleTemperatureUnit(temperatureOfParis.temperature)
          const WeatherDescriptionOfParis = temperatureOfParis.description;
          setParisWeatherDescription(WeatherDescriptionOfParis);
          setParisTemperature(newTemperatureOfParis);
          const temperatureOfTokyo = await fetchTemperature('Tokyo');
          const newTemperatureOfTokyo = handleTemperatureUnit(temperatureOfTokyo.temperature)
          const WeatherDescriptionOfTokyo = temperatureOfTokyo.description;
          setTokyoWeatherDescription(WeatherDescriptionOfTokyo);
          setTokyoTemperature(newTemperatureOfTokyo);
          const temperatureOfBerlin = await fetchTemperature('Berlin');
          const newTemperatureOfBerlin = handleTemperatureUnit(temperatureOfBerlin.temperature)
          const WeatherDescriptionOfBerlin = temperatureOfBerlin.description;
          setBerlinWeatherDescription(WeatherDescriptionOfBerlin);
          setBerlinTemperature(newTemperatureOfBerlin);
          const temperatureOfBangkok = await fetchTemperature('Bangkok');
          const newTemperatureOfBangkok = handleTemperatureUnit(temperatureOfBangkok.temperature)
          const WeatherDescriptionOfBangkok = temperatureOfBangkok.description;
          setBangkokWeatherDescription(WeatherDescriptionOfBangkok);
          setBangkokTemperature(newTemperatureOfBangkok);

          
        };
    
        fetchData();
    }, []);


    return (
        <div className="custom-row d-flex">
            <div className='col-md-6'>
                <div className='card cardi cardinal'>
                <div className="card-header heads">
                    <h1 className='pull-left fonty-two' style={{ float: 'left' }}> {getCurrentDate}</h1>
                    
                </div>
                <div className="card-body bodys d-flex align-items-center justify-content-center">
                    <div className='col-md-7'>
                        <h3 className='pull-right fonty-two' style={{paddingLeft: 16}}>{getTime}</h3>
                        <div className='basicInfoOne d-flex align-items-center justify-content-center'>
                            <img src={getWeatherPng} alt='' className='MeWeatherPng'/>
                        </div>
                    </div>
                    <div className='col-md-5'>
                    <div className='basicInfoTwo'>
                        <h1 className='fonty-two-one'>{getWeatherTemp}&deg;C</h1>
                    </div>
                    <div className='basicInfoTwo'>
                        <h4>{getWeatherDescription}</h4>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
            <div className='col-md-6'>
                <div className='card cardinality rowie-1'>
                    <div className='card-body'>
                    <div className='rownald d-flex align-items-center justify-content-center'>
                        <div className='col-md-4 colfourheight'>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h3 className='cardinalityhead'>{weatherPressure}hPa</h3>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Pressure</h5>
                                </div>
                            </div>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h2 className='cardinalityhead'>{weatherHumidity}%</h2>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Humidity</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 colfourheight'>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h2 className='cardinalityhead'>{weatherWindSpeed}m/s</h2>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Wind</h5>
                                </div>
                            </div>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h2 className='cardinalityhead'>{weatherVisibility}m</h2>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Visibility</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 colfourheight'>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h3 className='cardinalityhead'>{getSunriseTime}</h3>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Sunrise</h5>
                                </div>
                            </div>
                            <div className="card-body bodinize">
                                <div className='first-row d-flex align-items-center justify-content-center'>
                                    <h3 className='cardinalityhead'>{getSunsetTime}</h3>
                                </div>
                                <div className='second-row d-flex align-items-center justify-content-center'>
                                    <h5>Sunset</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>





          
        </div>
    )
}


            /* <div className='col-md-3'>
                <div className='card cardi rowie-1'>
                    <div className="card-body">
                        <div className='first-row d-flex align-items-center justify-content-center'>
                            <img src={pressure} alt=''/>
                        </div>
                        <div className='second-row  d-flex align-items-center justify-content-center'>
                            <span>Pressure: {weatherPressure} hPa</span>
                        </div>
                    </div>
                </div>
                <div className='card cardi rowie-1'>
                    <div className="card-body">
                        <div className='first-row d-flex align-items-center justify-content-center'>
                            <img src={humid} alt=''/>
                        </div>
                        <div className='second-row  d-flex align-items-center justify-content-center'>
                            <span>Humidity: {weatherHumidity}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card cardi rowie-1'>
                    <div className="card-body">
                        <div className='first-row d-flex align-items-center justify-content-center'>
                            <img src={windSpeed} alt=''/>
                        </div>
                        <div className='second-row  d-flex align-items-center justify-content-center'>
                            <span>Wind: {weatherWindSpeed}m/s</span>
                        </div>
                    </div>
                </div>
                <div className='card cardi rowie-1'>
                    <div className="card-body">
                        <div className='first-row d-flex align-items-center justify-content-center'>
                            <img src={visible} alt=''/>
                        </div>
                        <div className='second-row  d-flex align-items-center justify-content-center'>
                            <span>Visibility: {weatherVisibility} meters</span>
                        </div>
                    </div>
                </div>
            </div> */


export default BodyRowOneComponent;



/*

                <div className='dee d-flex align-items-center justify-content-center'>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>Beijing</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(beijingWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{beijingTemperature !== null ? `${beijingTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>New York</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(newYorkWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{newYorkTemperature !== null ? `${newYorkTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>Paris</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(parisWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{parisTemperature !== null ? `${parisTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>Tokyo</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(tokyoWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{tokyoTemperature !== null ? `${tokyoTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>Berlin</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(berlinWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{berlinTemperature !== null ? `${berlinTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='card cardi cardiot'>
                        <div className="card-body">
                            <div className='first-row-two d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>Bangkok</h6>
                            </div>
                            <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                <img src={getWeatherPngTwo(bangkokWeatherDescription)} alt='' className='cardiotpng'/>
                            </div>
                            <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                <h6 className='staticcountry'>{bangkokTemperature !== null ? `${bangkokTemperature} °C` : 'Loading...'}</h6>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='dee d-flex align-items-center justify-content-center'>
                    {forecastData.map((data) => {
                        const date = new Date(data.dt * 1000);
                        const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
            
                        return (
                            <div className='card cardi cardiot' key={data.dt}>
                                <div className="card-body">
                                    <div className='first-row-two d-flex align-items-center justify-content-center'>
                                        <h6 className='staticcountry'><strong>{dayOfWeek}</strong></h6>
                                    </div>
                                    <div className='second-row-two  d-flex align-items-center justify-content-center'>
                                        <h6 className='staticcountry'>{data.weather[0].description}</h6>
                                    </div>
                                    <div className='third-row-two  d-flex align-items-center justify-content-center'>
                                        <h6 className='staticcountry'>{Math.round(data.main.temp - 273.15)}</h6>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>


*/