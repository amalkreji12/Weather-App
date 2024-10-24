const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');

const getWeatherSummary = async (city) =>{
    // console.log('City:'+city)
    const apikey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    // console.log('URL :'+url);
    

    try {
        const response = await axios.get(url);
        const data = response.data;    

        const temp = data.main.temp - 273.15;
        const temp_max = data.main.temp_max - 273.15;
        const temp_min = data.main.temp_min - 273.15;
        const feels_like = data.main.feels_like - 273.15;

        return{
            city,
            temp,
            feels_like,
            weather:data.weather[0].main,
            time: new Date(data.dt*1000)
        };
    } catch (error) {
        console.log('Error fetching weather summary:', error);
        throw error;
        
    };
} ;


const calculateWeatherSummary = async (city) => {
    const weatherData = await getWeatherSummary(city);
    // console.log('Weather data:',weatherData);

    const temps = weatherData.temps || [weatherData.temp];

    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);


    const summary = new WeatherSummary({
        city,
        date: new Date(),
        avgTemp: avgTemp,
        maxTemp: maxTemp,
        minTemp: minTemp,
        dominantWeather: weatherData.weather,
        alerts:[]
    });

    await summary.save();
    // console.log('Weather summary saved:',summary);
    
    console.log('Weather summary saved:',city);
};

module.exports = {getWeatherSummary,calculateWeatherSummary};