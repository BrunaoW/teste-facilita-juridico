CREATE DATABASE AcompanhaLimpeza;

\c acompanhalimpeza;

CREATE EXTENSION citext;

CREATE TABLE Customers (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100),
  email CITEXT,
  phone VARCHAR(25),
  x_address INT,
  y_address INT
);