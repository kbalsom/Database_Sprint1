const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/cities', db.getCities)
app.get('/city', db.getCityById)
app.get('/cities/search', db.findCitiesByName)
app.post('/city/create', db.createCity)
app.put('/city/:id', db.updateCity)
app.delete('/city/:id', db.deleteCity)

app.get('/airports', db.getAirports)
app.get('/airport', db.getAirportById)
app.get('/airports/search/name', db.findAirportsByName)
app.get('/airports/search/code', db.findAirportsByCode)

app.get('/aircrafts', db.getAircrafts)
app.get('/aircraft', db.getAircraftById)

app.get('/passengers', db.getPassengers)
app.get('/passenger', db.getPassengerById)

//4 Questions
app.get('/airportscities', db.getAirportsCities)
app.get('/aircraftsairports', db.getAircraftsAirports)
app.get('/passengersaircrafts', db.getPassengersAircrafts)
app.get('/passengersairports', db.getPassengersAirports)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



// DT was here
// Hello Kara
