'use strict';


// Dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');



//Routes
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cors());
app.get('/',homeHandler);
app.post('/search',getVehicleData);

//Route Functionality
function homeHandler(request,response) {
  let viewModel = {

  }
  response.status(200).render('pages/index',viewModel);
}

function errorHandler(error, response) {
  let viewModel = {
    error: error
  }
  response.status(500).render('pages/error', viewModel);
}

function getVehicleData(request,response) {
  const url = 'https://swapi.dev/api/vehicles/';
  superagent.get(url)
    .query({
      format: 'json'
    })
    .then(vehicleDataResponse => {
      const arrayVehicleData = vehicleDataResponse.body;
      const vehiclesResult = [];
      arrayVehicleData.foreach(vehicle => {
        vehiclesResult.push(new Vehicles(vehicle))
      })
      return vehiclesResult;
    })
    .then(results => {
      console.log(results);
      let viewModelObject = {vehicles: results};
      response.render('index', viewModelObject)
    })
    .catch(err => {
      console.log(err);
      errorHandler(err, request, response);
    });
}

function Vehicles(vehicle){

  this.vehName = vehicle.name;
  this.passenger = vehicle.passenger;
  this.model = vehicle.model;
  this.vehLength = vehicle.length;
  this.cargo_capacity = vehicle.cargo_capacity;
}
// Listener

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
