//SRPINT 1 DATABASE PROGRAMMING
//WRITTEN BY: KARA BALSOM, GLEN MAY, MAKENZIE ROBERTS, & DAVID TURNER
//DATE WRITTEN: OCTOBER 25, 2022

const Pool = require("pg").Pool; //Set up the Pool class and assign it to the constant "Pool".
const pool = new Pool({
  //Set up the information needed to connect to the database:
  user: "postgres",
  host: "localhost",
  database: "qap1", //A user will have to change to the name they chose when they restored the database.
  password: "MacAlex", //A user will have to enter their own password.
  port: 5432, //Port 5432 is used by Postgres.
});

//CITIES TABLE:

//getCities will retrieve the whole cities table.
const getCities = (request, response) => {
  pool.query("SELECT * FROM qap1.cities ORDER BY id ASC", (error, results) => {
    //Sets up the SQL statement to retrieve the cities table.
    if (error) {
      throw error; //Throws an error to the terminal if there is an error.
    }
    response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
  });
};

//getCityById retrieves a record by its ID.
const getCityById = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".

  pool.query(
    "SELECT * FROM qap1.cities WHERE id = $1", //Sets up the SQL statement. The constant [id] gives the requested ID.
    [id],
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//findCityByName retrieves a record by city_name.
const findCityByName = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".
  const name = request.query.city_name; //Extracts the city_name from the request and assigns it to the constant "name".

  var sqlStmt = "SELECT * FROM qap1.cities where "; //Sets up the SQL statement and assigns it to the variable "sqlStmt"

  if (!name == false) {
    //If "name" is not false, i.e. it is a name that corresponds with one in the cities table, then the string "city_name =" and the constant "name" are added to "sqlStmt".
    sqlStmt += "city_name = '" + name + "' ";
    console.log("adding city_name = " + name); //Logs the string "adding city_name" and the constant "name" to the terminal.
  }

  if (!Number.isNaN(id)) {
    //If "id" is a not Not a Number, i.e. it is a real number, the string "AND id =" and the constant "id" are added to "sqlStmt"
    sqlStmt += "AND id = " + id;
    console.log("Id = " + id); //Logs the string "Id =" and the constant "id" to the terminal.
  }

  console.log(sqlStmt); //Logs the constant "sqlStmt" to the terminal.

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error; //Throws an error to the terminal if there is an error.
    }
    response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
  });
};

//createCity creates (POST) a new row in the cities table.
const createCity = (request, response) => {
  const { id, city_name, country, population } = request.body; //The request body will consist of the four columns of the cities table.

  pool.query(
    "INSERT INTO qap1.cities (id, city_name, country, population) VALUES ($1, $2, $3, $4)",
    [id, city_name, country, population], //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(201).send(`City added with ID: ${id}`); //Sends the response back to the server and a 200 status code (OK).
    }
  );
};

//updateCity (PUT) changes an already existing row in the cities table.
const updateCity = (request, response) => {
  const id = parseInt(request.params.id); //Parses the ID from the request and assigns it to the constant "id".
  const { city_name, country, population } = request.body; //The request body will consist of the four columns of the cities table.

  pool.query(
    "UPDATE qap1.cities SET city_name = $1, country = $2, population = $3 WHERE id = $4",
    [city_name, country, population, id], //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).send(`City modified with ID: ${id}`); //Sends the response back to the server and a 200 status code (OK).
    }
  );
};

//deleteCity deletes (DELETE) a row of the cities table.
const deleteCity = (request, response) => {
  const id = parseInt(request.params.id); //Parses the ID from the request and assigns it to the constant "id".

  pool.query(
    "DELETE FROM qap1.cities WHERE id = $1",
    [id], //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).send(`City deleted with ID: ${id}`); //Sends the response back to the server and a 200 status code (OK).
    }
  );
};

//AIRPORTS TABLE

//getAirports will retrieve the whole airports table.
const getAirports = (request, response) => {
  pool.query(
    "SELECT * FROM qap1.airports ORDER BY id ASC", //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//getAirportById retrieves a record by its ID.
const getAirportById = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".

  pool.query(
    "SELECT * FROM qap1.airports WHERE id = $1",
    [id], //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//findAirportByName retrieves a record by airport_name.
const findAirportByName = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".
  const name = request.query.airport_name; //Extracts the city_name from the request and assigns it to the constant "name".

  var sqlStmt = "SELECT * FROM qap1.airports where "; //Sets up the SQL statement and assigns it to the variable "sqlStmt".

  if (!name == false) {
    //If "name" is not false, i.e. it is a name that corresponds with one in the airports table, then the string "airport_name =" and the constant "name" are added to "sqlStmt".
    sqlStmt += "airport_name = '" + name + "' ";
    console.log("adding airport_name = " + name); //Logs the string "adding airport_name" and the constant "name" to the terminal.
  }

  if (!Number.isNaN(id)) {
    //If "id" is a not Not a Number, i.e. it is a real number, the string "AND id =" and the constant "id" are added to "sqlStmt".
    sqlStmt += "AND id = " + id;
    console.log("Id = " + id); //Logs the string "adding city_name" and the constant "name" to the terminal.
  }

  console.log(sqlStmt); //Logs the constant "sqlStmt" to the terminal.

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error; //Throws an error to the terminal if there is an error.
    }
    response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
  });
};

//findAirportByCode retrieves a record by code.
const findAirportByCode = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".
  const code = request.query.code; //Extracts the code from the request and assigns it to the constant "code".

  var sqlStmt = "SELECT * FROM qap1.airports where "; //Sets up the SQL statement and assigns it to the variable "sqlStmt".

  if (!code == false) {
    //If "code" is not false, i.e. it is a code that corresponds with one in the airports table, then the string "code =" and the constant "code" are added to "sqlStmt".
    sqlStmt += "code = '" + code + "' ";
    console.log("adding code = " + code); //Logs the string "adding code" and the constant "code" to the terminal.
  }

  if (!Number.isNaN(id)) {
    //If "id" is a not Not a Number, i.e. it is a real number, the string "AND id =" and the constant "id" are added to "sqlStmt".
    sqlStmt += "AND id = " + id;
    console.log("Id = " + id); //Logs the string "adding city_name" and the constant "name" to the terminal.
  }

  console.log(sqlStmt); //Logs the constant "sqlStmt" to the terminal.

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error; //Throws an error to the terminal if there is an error.
    }
    response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
  });
};

//AIRCRAFTS TABLE:

//getAircrafts will retrieve the whole aircrafts table.
const getAircrafts = (request, response) => {
  pool.query(
    "SELECT * FROM qap1.aircrafts ORDER BY id ASC", //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//getAircraftById retrieves a record by its ID.
const getAircraftById = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".

  pool.query(
    "SELECT * FROM qap1.aircrafts WHERE id = $1",
    [id], //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//PASSENGERS TABLE:

//getPassengers will retrieve the whole passengers table.
const getPassengers = (request, response) => {
  pool.query(
    "SELECT * FROM qap1.passengers ORDER BY id ASC", //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//getPassengersById retrieves a record by its ID.
const getPassengerById = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".

  pool.query(
    "SELECT * FROM qap1.passengers WHERE id = $1",
    [id], //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//findPassengerByLastName retrieves a record by last_name from the passengers table.
const getPassengerByLastName = (request, response) => {
  const id = parseInt(request.query.id); //Parses the ID from the request and assigns it to the constant "id".
  const name = request.query.last_name; //Extracts the city_name from the request and assigns it to the constant "name".

  var sqlStmt = "SELECT * FROM qap1.passengers where "; //Sets up the SQL statement and assigns it to the variable "sqlStmt".

  if (!name == false) {
    //If "name" is not false, i.e. it is a name that corresponds with one in the passengers table, then the string "last_name =" and the constant "name" are added to "sqlStmt".
    sqlStmt += "last_name = '" + name + "' ";
    console.log("adding last_name = " + name); //Logs the string "adding airport_name" and the constant "name" to the terminal.
  }

  if (!Number.isNaN(id)) {
    //If "id" is a not Not a Number, i.e. it is a real number, the string "AND id =" and the constant "id" are added to "sqlStmt".
    sqlStmt += "AND id = " + id;
    console.log("Id = " + id); //Logs the string "adding city_name" and the constant "name" to the terminal.
  }

  console.log(sqlStmt); //Logs the constant "sqlStmt" to the terminal.

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error; //Throws an error to the terminal if there is an error.
    }
    response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
  });
};

//WHICH AIRCRAFTS CAN LAND AT WHICH AIRPORTS:

//getAirportsCities uses a join statement on the airports and cities table to return which airports can land in which cities.
const getAirportsCities = (request, response) => {
  pool.query(
    `SELECT a."airport_name", c."city_name"
  FROM qap1.airports a
  INNER JOIN qap1.cities c ON a."city_id"= c.id;
  `, //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//WHICH AIRCRAFTS CAN LAND AT WHICH AIRPORTS:

//getAircraftsAirports uses join statements the aircrafts_airports, airports, and aircrafts tables to return which aircrafts can land at which airports.
const getAircraftsAirports = (request, response) => {
  pool.query(
    `select c."type", c."airline_name", p."airport_name"
  from qap1.aircrafts_airports a
  inner join qap1.aircrafts c on a."aircraft_id"=c.id
  inner join qap1.airports p on a."airport_id"=p.id;
  `, //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//WHICH PASSENGERS TRAVELLED ON WHICH AIRCRAFTS:

//getPassengersAircrafts uses join statements the passengers_aircrafts, passengers, and aircrafts tables to return which passengers travelled on which aircrafts.
const getPassengersAircrafts = (request, response) => {
  pool.query(
    `SELECT p."first_name", p."last_name" , c."type"
  from qap1.passengers_aircrafts a
  inner join qap1.passengers p on a."passenger_id" = p.id
  inner join qap1.aircrafts c on a."aircraft_id" = c.id;`, //Set up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//WHICH PASSENGERS VISITED WHICH AIRPORTS:

//getPassengersAirports uses join statements the passengers_aircrafts, aircrafts_airports, passengers, and airports tables to return which passengers visited which airports.
const getPassengersAirports = (request, response) => {
  pool.query(
    `SELECT p."first_name", p."last_name", c."airport_name"
  from qap1.passengers_aircrafts g
  inner join qap1.passengers p on g."passenger_id" = p.id
  inner join qap1.aircrafts_airports t on g."aircraft_id"=t.id
  inner join qap1.airports c on t."airport_id" = c.id
  order by p.id ASC;
  `,
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//CREATE A NEW TABLE:

//createAirlinesTable creates (POST) a new table called airlines.
const createAirlinesTable = (request, response) => {
  var sql =
    "CREATE TABLE qap1.airlines (id INT, airline_name VARCHAR(255), country VARCHAR(255))"; //Sets up the SQL statement and assigns it to the variable sql.
  pool.query(sql, function (err, result) {
    if (err) throw err; //Throws an error to the terminal if there is an error.
  });
  response.status(200).json(`Table Created`); //Sends the string "Table Created" back to the server as a response, and a 200 status code (OK).
};

//createAirline creates (POST) a new row in the airlines table.
const createAirline = (request, response) => {
  const { id, airline_name, country } = request.body; //The request body will consist of the three columns of the airlines table.

  pool.query(
    "INSERT INTO qap1.airlines (id, airline_name, country) VALUES ($1, $2, $3)",
    [id, airline_name, country], //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(201).send(`Airline added with ID: ${id}`); //Sends the string "Table Created" and the constant "id" back to the server as a response, and a 200 status code (OK).
    }
  );
};

//getAirlines will retrieve the whole passengers table.
const getAirlines = (request, response) => {
  pool.query(
    "SELECT * FROM qap1.airlines ORDER BY id ASC", //Sets up the SQL statement.
    (error, results) => {
      if (error) {
        throw error; //Throws an error to the terminal if there is an error.
      }
      response.status(200).json(results.rows); //Sends the response back to the server with the results of the query and a 200 status code (OK).
    }
  );
};

//Exports all the functions set up in queries.js so they can be called in other files.
module.exports = {
  getCities,
  getCityById,
  findCityByName,
  createCity,
  updateCity,
  deleteCity,
  getAirports,
  getAirportById,
  findAirportByCode,
  findAirportByName,
  getAircrafts,
  getAircraftById,
  getPassengers,
  getPassengerById,
  getPassengerByLastName,
  createAirlinesTable,
  createAirline,
  getAirlines,
  getAirportsCities,
  getAircraftsAirports,
  getPassengersAircrafts,
  getPassengersAirports,
};
