const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c2b515d704a9c87e59badbd5640d0347&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          " It is currently " +
          body.current.temperature +
          " degress out. It feels like " +
          body.current.feelslike +
          ". There is a " +
          body.current.precip +
          "% chance of rain. The humidity rate is " +
          body.current.humidity +
          "% out there"
      );
    }
  });
};

module.exports = forecast;
