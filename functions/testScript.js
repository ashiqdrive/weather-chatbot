const getWeather = require('./getWeather.js');

async function ask_weather(city_name) {
    //const city_name = agent.parameters['city'];
    const reply = await getWeather(city_name);
    console.log(reply)
    //agent.add(reply.toString());
    //agent.add(`weather condition for ${city_name}`);
    // ** need to implement random responce **
  }

ask_weather("mumbai")