CREATE TABLE IF NOT EXISTS starWarsDex (
  id SERIAL PRIMARY KEY,
  ImagUrl VARCHAR(100),
  vehName VARCHAR (500) NOT NULL,
  passenger VARCHAR (500) NOT NULL,
  model VARCHAR (100) NOT NULL,
  vehLength VARCHAR(5000) NOT NULL,
  cargo_capacity VARCHAR (8000) NOT NULL
);
