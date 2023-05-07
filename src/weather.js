const api_key = '7f9dd53a1e814299f956632bc37b157d';

const CreateiconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherData = async (city, units = "metric") => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`;

    const data = await fetch(URL).then((res)=>res.json()).then((data)=>data);

    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = data;
    
      const { description, icon } = weather[0];
    
      return {
        description,
        iconURL: CreateiconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
      };



    
}

export { getWeatherData };