'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;

app.get('', (request, response) => {
  response.send('Listening on 3000');
});

app.get('/location', (request, response) => {
  try{
    const city = request.query.data;
    const locationData = searchLatToLong(city);
    response.send(locationData);
  }
  catch(error) {
    console.error(error);

    response.status(500).send('So sorry, something wrong over here!');
  }
});

function searchLatToLong(location) {
  const geoData = require('./data/geo.json');
  const locationObject = new Locale(location, geoData);

  return locationObject;
}


function Locale(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

let forecast =[];

app.get('/weather', (request, response) => {
  try{
    const weather = request.query.data;
    const weatherData = searchWeather(weather);
    response.send(weatherData);
  }
  catch(error) {
    console.error(error);

    response.status(500).send('So sorry, something wrong over here!');
  }
});

function searchWeather(location) {
  const wData = require('./data/darksky.json');
  const weatherObject = new Weather(location, wData);

  return weatherObject;
}

function Weather(city, wData) {
  this.search_query = city;
  this.forecast = wData.results.hourly.summary;
  this.time = wData.hourly.time;

  forecast.push(this);
}
Weather.prototype.revisedDate = function (time){
  let date = new Date(time*1000);
  return date.toDateString();
};

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
