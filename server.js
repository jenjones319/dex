'use strict';


// Dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');


// const{DATABASE_URL} = process.env;
// if (!DATABASE_URL){throw 'DATABASE_URL IS MISSING'}
// const client = new pg.Client(DATABASE_URL);




//Routes
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;
app.use(cors());
app.get('/',homeHandler);
app.post('/search',getVehicleData);
app.post('/garage',makeNewVehicle);

//Route Handlers
function homeHandler(request,response) {
  let viewModel = {

  }
  response.status(200).render('pages/index',viewModel);
}

function errorHandler(error, request, response, next) {
  // let viewModel = {
  //   error: error
  // }
  response.status(500).json({error: true,message: error.message})
}

function makeNewVehicle(request,response) {
  let SQL = 'INSERT INTO vehicles (imag_url, name, model, length, cargo_capacity) VALUES ($1,$2,$3,$4,$5);';
  let {imag_url, name, model, length, cargo_capacity } = request.body;
  let values = [imag_url, name, model, length, cargo_capacity];

  return client.query(SQL, values)
    .then(response.redirect('/'))
}



function getVehicleData(request,response) {
  const url = 'https://swapi.dev/api/vehicles/';
  const {name}=request.body
  superagent.get(url)
    .query({
      search:name
    })
    .then(vehicleDataResponse => {
      const arrayVehicleData = vehicleDataResponse.body.results;
      const vehiclesResult = [];
      arrayVehicleData.forEach(vehicle => {
        vehiclesResult.push(new Vehicles(vehicle))
      })
      return vehiclesResult;
    })
    .then(results => {
      console.log(results);
      let viewModelObject = {vehicles: results};
      response.render('pages/results', viewModelObject)
    })
    .catch(err => {
      console.log(err);
      errorHandler(err, request, response);
    });
}

function Vehicles(vehicle){

  this.name = vehicle.name;
  this.model = vehicle.model;
  this.length = vehicle.length;
  this.cargo_capacity = vehicle.cargo_capacity;
  this.image_url = `${vehicle.name.toLowerCase().split(' ').join('')}.jpg`;
}
// Event Listener
//client.connect()
//  .then(() => {
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
//  })
//  .catch(console.error)
