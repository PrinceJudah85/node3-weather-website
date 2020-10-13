const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=85e5259c6f7f6a67e0cd9898311e97e9&query=${latitude}%2C${longitude}&units=f`
  // const testURL = `http://api.weatherstack.com/current?access_key=85e5259c6f7f6a67e0cd9898311e97e9&query=44.15452C-75.7088&units=f`

  request({ url, json: true }, (error, {body} = {}) => { // Same as: response.body
    if (error) {
      callback('Unable to connect to weather service')
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { temperature: temp, feelslike, weather_descriptions: description } = body.current;

      callback(undefined, `${description}. It is currently ${temp} degrees out. It feels like ${feelslike} degrees out.`)
    }
  })
}

module.exports = forecast