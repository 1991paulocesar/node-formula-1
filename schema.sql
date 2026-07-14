CREATE DATABASE IF NOT EXISTS formula_one;
USE formula_one;

CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  base VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS drivers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  team VARCHAR(100) NOT NULL
);

INSERT INTO teams (name, base) VALUES
('McLaren', 'Woking, United Kingdom'),
('Mercedes', 'Brackley, United Kingdom'),
('Red Bull Racing', 'Milton Keynes, United Kingdom'),
('Ferrari', 'Maranello, Italy'),
('Alpine', 'Enstone, United Kingdom'),
('Aston Martin', 'Silverstone, United Kingdom'),
('Alfa Romeo Racing', 'Hinwil, Switzerland'),
('AlphaTauri', 'Faenza, Italy'),
('Williams', 'Grove, United Kingdom'),
('Haas', 'Kannapolis, United States');

INSERT INTO drivers (name, team) VALUES
('Max Verstappen', 'Red Bull Racing'),
('Lewis Hamilton', 'Ferrari'),
('Lando Norris', 'McLaren');