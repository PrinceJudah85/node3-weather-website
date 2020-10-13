const request = require('postman-request');

const geocode = (address, callback) => {
  const apiKey = `pk.eyJ1Ijoia3JvbWJvcHVsb3MtbWlrZTIzIiwiYSI6ImNrZnJhemdtMDBjZWsyem84ZXA3ZnQyMTUifQ.ChQb5KDyFs-gD_-raHrlcg`
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`

  request({ url, json: true }, (error, {body} = {}) => { // {body} is a property of the response object that returns data from the HTTP request
    if (error) {
      callback('Unable to connect to location services')
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const { features } = body; // Same as : response.body.features 
      const [longitude, latitude] = features[0].center //Same as: response.body.features[0].centner.longitude / response.body.features[0].centner.latitude

      callback(undefined, {
        latitude,
        longitude,
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode