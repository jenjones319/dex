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
app.post('/search',choosePokemon);

//Route Functionality
function homeHandler(request,response) {
  let viewModel = {

  }
  response.status(200).render('pages/index',viewModel);
}

function choosePokemon(request,response) {
  console.log(request.body);
  const name = request.body.name
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return superagent.get(url)
    .then(data => {
      response.send(data.body)
    })
    .catch(err => {
      console.log(err)
    });
}

// Listener

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));