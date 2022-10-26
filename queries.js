const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qap1',
  password: 'MacAlex',
  port: 5432,
})


//CITIES TABLE:

const getCities = (request, response) => {
  pool.query('SELECT * FROM qap1.cities ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCityById = (request, response) => {
  const id = parseInt(request.query.id)

  pool.query('SELECT * FROM qap1.cities WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const findCitiesByName = (request, response) => {
  const id = parseInt(request.query.id)
  const name = request.query.city_name

  var sqlStmt = 'SELECT * FROM qap1.cities where '

  if (!name == false) {
    sqlStmt += ("city_name = '" + name + "' ")
    console.log("adding city_name = " + name)
  }

  if (!Number.isNaN(id)) {
    sqlStmt += ("AND id = " + id)
    console.log("Id = " + id)
  }

  console.log(sqlStmt)

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCity = (request, response) => {
  const { id, city_name, country, population } = request.body

  pool.query('INSERT INTO qap1.cities (id, city_name, country, population) VALUES ($1, $2, $3, $4)', [id, city_name, country, population], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`City added with ID: ${id}`)
  })
}

const updateCity = (request, response) => {
  const id = parseInt(request.params.id)
  const {city_name, country, population} = request.body

  pool.query(
    'UPDATE qap1.cities SET city_name = $1, country = $2, population = $3 WHERE id = $4',
    [city_name, country, population, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`City modified with ID: ${id}`)
    }
  )
}

const deleteCity = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM qap1.cities WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`City deleted with ID: ${id}`)
  })
}

//AIRPORTS TABLE

const getAirports = (request, response) => {
  pool.query('SELECT * FROM qap1.airports ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAirportById = (request, response) => {
  const id = parseInt(request.query.id)

  pool.query('SELECT * FROM qap1.airports WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const findAirportsByName = (request, response) => {
  const id = parseInt(request.query.id)
  const name = request.query.airport_name

  var sqlStmt = 'SELECT * FROM qap1.airports where '

  if (!name == false) {
    sqlStmt += ("airport_name = '" + name + "' ")
    console.log("adding airport_name = " + name)
  }

  if (!Number.isNaN(id)) {
    sqlStmt += ("AND id = " + id)
    console.log("Id = " + id)
  }

  console.log(sqlStmt)

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const findAirportsByCode = (request, response) => {
  const id = parseInt(request.query.id)
  const code = request.query.code

  var sqlStmt = 'SELECT * FROM qap1.airports where '

  if (!code == false) {
    sqlStmt += ("code = '" + code + "' ")
    console.log("adding code = " + code)
  }

  if (!Number.isNaN(id)) {
    sqlStmt += ("AND id = " + id)
    console.log("Id = " + id)
  }

  console.log(sqlStmt)

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

//AIRCRAFTS TABLE:

const getAircrafts = (request, response) => {
  pool.query('SELECT * FROM qap1.aircrafts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAircraftById = (request, response) => {
  const id = parseInt(request.query.id)

  pool.query('SELECT * FROM qap1.aircrafts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const findAircraftsByName = (request, response) => {
  const id = parseInt(request.query.id)
  const name = request.query.name

  var sqlStmt = 'SELECT * FROM qap1.aircrafts where '

  if (!name == false) {
    sqlStmt += ("name = '" + name + "' ")
    console.log("adding name = " + name)
  }

  if (!Number.isNaN(id)) {
    sqlStmt += ("AND id = " + id)
    console.log("Id = " + id)
  }

  console.log(sqlStmt)

  pool.query(sqlStmt, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//PASSENGERS TABLE:

const getPassengers = (request, response) => {
  pool.query('SELECT * FROM qap1.passengers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPassengerById = (request, response) => {
  const id = parseInt(request.query.id)

  pool.query('SELECT * FROM qap1.passengers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//WHAT AIRCRAFTS CAN LAND IN WHAT AIRPORTS: FIX THIS!!!!
const getAirportsCities = (request, response) => {
  pool.query(`SELECT a."airport_name", c."city_name"
  FROM qap1.airports a
  INNER JOIN qap1.cities c ON a."cities_id"= c.id;
  `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//WHAT AIRCRAFTS CAN LAND IN WHAT AIRPORTS:
const getAircraftsAirports = (request, response) => {
  pool.query(`select c."type", c."airlineName", p."airport_name"
  from qap1.aircrafts_airports a
  inner join qap1.aircrafts c on a."aircrafts_id"=c.id
  inner join qap1.airports p on a."airports_id"=p.id;
  `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


//WHAT PASSENGERS ON WHICH AIRCRAFTS:
const getPassengersAircrafts = (request, response) => {
  pool.query(`SELECT p."firstName", p."lastName" , c."type"
  from qap1.passengers_aircrafts a
  inner join qap1.passengers p on a."passengers_id" = p.id
  inner join qap1.aircrafts c on a."aircrafts_id" = c.id;`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//WHAT PASSENGERS VISITED WHICH AIRPORTS:
const getPassengersAirports = (request, response) => {
  pool.query(`SELECT p."firstName", p."lastName", c."airport_name"
  from qap1.passengers_aircrafts g
  inner join qap1.passengers p on g."passengers_id" = p.id
  inner join qap1.aircrafts_airports t on g."aircrafts_id"=t.id
  inner join qap1.airports c on t."airports_id" = c.id
  order by p.id ASC;
  `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//PUT
//POST
//DELETE

module.exports = {
  getCities,
  getCityById,
  findCitiesByName,
  createCity,
  updateCity,
  deleteCity,
  getAirports,
  getAirportById,
  findAirportsByCode,
  findAirportsByName,
  getAircrafts,
  getAircraftById,
  findAircraftsByName,
  getPassengers,
  getPassengerById,
  getAirportsCities,
  getAircraftsAirports,
  getPassengersAircrafts,
  getPassengersAirports
}
