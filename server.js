'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;

app.get('', (request, response) => {
  response.send('Listening on 3000');
});


//routes
app.get('/location', handleLocation);
app.get('/weather', handleWeather);


//functions
let locations = {};
function handleLocation(request, response){
  const location = request.quesry.data;


  if (locations[url]){
    response.send(locations[url]);
  } else {
    const url = `https://maps.googlespis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;
  }
}




function handleLocation(request, response){
  try{
    const location = request.query.data;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?addres=${location}&key=${process.env.GEOCODE_API_KEY}`;

    superagent.get(url)
      .then(resultsFromSuperAgent => {
        const locationOb = new Location(location, resultsFromSuperAgent.body.results[0]);

        locations[name] = locationOb;

        response.status(200).send(locationOb);
      });

  }
  catch (error) {
    console.log(error);
    response.status(500).send('our bad');
  }
}

function searchLatToLong(location) {
  const geoData = require('./data/geo.json');
  const locationObj = new Locale(location, geoData);

  return locationObj;
}

function Locale(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}


function handleWeather(request, response) {
  console.log(request.query.data);

  const locationObject = request.query.data;
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${locationObject.latitude},${locationObject.longitude}`;
  superagent.get(url)
    .then(resultsFromSuperAgent => {
      console.log(resultsFromSuperAgent);

     const weeklyWeather = resultsFromSuperAgent.body.daily.data.map(day => {
       return new Weather(day);
    })
    response.send(weeklyWeather);
}

function Weather(obj){
  this.forecast = obj.summary;
  this.time = new Date(obj.time*1000);
});

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));


//superagent.get('url that we want to visit')
//.then(response from superagent => {
// responseFromSuperAgent.bosy
//})
//.catch(console.error)


// app.get('/weather', (request, response) => {
//   try{
//     const weather = request.query.data;
//     const weatherData = searchWeather(weather);
//     response.send(weatherData);
//   }
//   catch(error) {
//     console.error(error);

//     response.status(500).send('So sorry, something wrong over here!');
//   }
// });

// function searchWeather(location) {
//   const wData = require('./data/darksky.json');
//   const weatherObject = new Weather(location, wData);

//   return weatherObject;
// }

// function Weather(city, wData) {
//   this.search_query = city;
//   this.forecast = wData.results.hourly.summary;
//   this.time = wData.hourly.time;

//   forecast.push(this);
// }
// Weather.prototype.revisedDate = function (time){
//   let date = new Date(time*1000);
//   return date.toDateString();
// };
}
