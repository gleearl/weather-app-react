import React, {useState} from "react";
import axios from "axios";
import './index.css';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const d = new Date();
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=544613c50840b157f51d996fb7f22b7c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        // console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">

      <div className="section left">

        <div className="temp-container">
          <span className="desc">{data.weather ? data.weather[0].main : null}</span>
          <span className="temp">{data.main ? data.main.temp.toFixed() : null}°C</span>
        </div>

        <div className="location-container">
          <span className="location">{data.name}</span>
          <span className="date">{days[d.getDay()]}, {d.getDate()} {months[d.getMonth()]} {d.getFullYear()}</span>
        </div>
      </div>

      <div className="section right">
        <div className="right-container">

          <div className="search-container">
            <div className="search">
              <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text" />
            </div>
          </div>

          <div className="info-container">
            <p className="weather-info">Weather Information</p>
            <div className="feels info">
              <span className="title">Feels</span>
              <span className="value">{data.main ? data.main.feels_like.toFixed() : null}°C</span>
            </div>

            <div className="humidity info">
              <span className="title">Humidity</span>
              <span className="value">{data.main ? data.main.humidity : null}%</span>
            </div>

            <div className="wind info">
              <span className="title">Wind</span>
              <span className="value">{data.wind ? data.wind.speed.toFixed() : null}KPH</span>
            </div>

          </div>
        </div>
          

          
        
      </div>
      
      
    </div>
  );
}

export default App;
