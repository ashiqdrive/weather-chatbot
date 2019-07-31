'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');

var express = require('express')
var cors = require('cors')
var app = express()


//MIDDELWARE Using Cross-origin resource sharing  
//app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

function welcome (agent) {
  agent.add(`Welcome to Express.JS webhook!`);
}

function fallback (agent) {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
}

function ask_weather (agent) {
  let city_name = agent.parameters['city']
  agent.add(`Your city name is ${city_name}`);
  agent.add(`weather condition for ${city_name}`);
}

function WebhookProcessing(req, res) {
  const agent = new WebhookClient({request: req, response: res});
  console.info(`agent set`);

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('ask_weather', ask_weather);
// intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
  agent.handleRequest(intentMap);
}


// Webhook
app.post('/', (req, res) => {
  console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);
  WebhookProcessing(req, res);
});

// app.listen(8080, function () {
//   console.info(`Webhook listening on port 8080!`)
// });

exports.app = functions.https.onRequest(app);
