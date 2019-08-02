const axios = require('axios');
require('dotenv').config()

const WEATHER_API = process.env.WEATHER_API;

function getWeatherData(cityName){
    try {
        weather_data = async () => await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${WEATHER_API}&units=metric`);
        temperature = weather_data.data.main.temp;
        country = weather_data.data.sys.country;
        text_responce = `Temperature in ${cityName}, ${country} is ${temperature} celsius`
        return text_responce;
    } catch (error) {
        console.error(error);
    }
}

module.exports = getWeatherData;