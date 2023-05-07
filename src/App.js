import ColdPic from "./Pictures/cold.jpg";
import HotPic from "./Pictures/hot.jpg";

import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getWeatherData } from "./weather";


function App() {

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [backg, setBackg] = useState(HotPic)


  useEffect(()=>{
    const fetchWeatherData = async () =>{
      const data = await getWeatherData(city, units)
      setWeather(data);

      const threshold = units === 'metric'? 20:60;
      if(data.temp<=threshold) setBackg(ColdPic);
      else setBackg(ColdPic);
    };

    fetchWeatherData();
    
  }, [units, city]);

  const handleUnits = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
    
  }
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }

  
  };



  return (
    <div className="app" style={{ backgroundImage: `url(${backg})` }}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
          <div className="section section_inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City Name " />
            <button onClick={(e) => handleUnits(e)}>°F</button>
          </div>
          <div className="section section_temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="Icon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
            </div>
          </div>
          {/*BOTTON DESCRIP*/}
          <Descriptions weather={weather} units={units}/>
        </div>

          )}
        
      </div>

    </div>
  );
}

export default App;