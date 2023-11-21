import React from 'react';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import loc from '../img/icons8-location-24.png'

const HeaderComponent = ({ city, setCity, getWeather, loading, weatherName, weatherCountry }) => {
  return (
    <header>
        <div class="main-header">
                <div class="row rowie">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <div className='d-flex align-items-center'>
                            <img src={loc} alt=''/>
                                <h4 className='para'>{weatherName}, {weatherCountry}</h4>
                        </div>

                    </div>
                    <div class="col-md-4">
                        <div className='d-flex align-items-center justify-content-center'>
                            <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            />
                            <button className='btn btn-primary' onClick={getWeather} disabled={loading}>
                            {loading ? 'Loading...' : 'Get Weather'}
                            </button>
                        </div>
              
                    </div>
                    <div class="col-md-4">
                        
                    </div>
                </div>
            
        </div>
      
    </header>
  );
};

export default HeaderComponent;
