//SRPINT 1 DATABASE PROGRAMMING
//WRITTEN BY: KARA BALSOM, GLEN MAY, MAKENZIE ROBERTS, & DAVID TURNER
//DATE WRITTEN: OCTOBER 25, 2022

const express = require("express"); //Require the express module and assign it to the constant "express".
const bodyParser = require("body-parser"); //Require the body parser module and assign it to the constant "bodyParser".
const app = express(); //Assign the constant app to the express function.
const db = require("./queries"); //Require queries.js and assign it to the constant "db".
const port = 3000; //Assign the constant port the value 3000.

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" }); //Displays the string on the / page of http://localhost:3000
});

//Creates the pathways for each function.

//Cities Table
app.get("/cities", db.getCities);
app.get("/city", db.getCityById);
app.get("/cities/search", db.findCityByName);
app.post("/city/create", db.createCity);
app.put("/city/:id", db.updateCity);
app.delete("/city/:id", db.deleteCity);

//Airports Table
app.get("/airports", db.getAirports);
app.get("/airport", db.getAirportById);
app.get("/airports/search/name", db.findAirportByName);
app.get("/airports/search/code", db.findAirportByCode);

//Aircrafts Table
app.get("/aircrafts", db.getAircrafts);
app.get("/aircraft", db.getAircraftById);

//Passengers Table
app.get("/passengers", db.getPassengers);
app.get("/passenger", db.getPassengerById);
app.get("/passenger/search/lastname", db.getPassengerByLastName);

//Airlines Table
app.post("/create/airlines", db.createAirlinesTable);
app.post("/create/airline", db.createAirline);
app.get("/airlines", db.getAirlines);

//4 Questions
app.get("/airportscities", db.getAirportsCities);
app.get("/aircraftsairports", db.getAircraftsAirports);
app.get("/passengersaircrafts", db.getPassengersAircrafts);
app.get("/passengersairports", db.getPassengersAirports);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
}); //uses app.listen function to listen for connections on port 3000 and logs a message on the console.
