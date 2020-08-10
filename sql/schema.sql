CREATE TABLE IF NOT EXISTS pokedex (
    id SERIAL PRIMARY KEY, 
    name VARCHAR (100),
    image_url VARCHAR (500),
    strength VARCHAR (500),
    author VARCHAR (500),
    descriptions VARCHAR (500),
    category VARCHAR (500)
);

/* update table fields to reflect what is available in pokeapi.*/
