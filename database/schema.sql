DROP DATABASE perfectplate;
CREATE DATABASE IF NOT EXISTS perfectplate;

USE perfectplate;

CREATE TABLE IF NOT EXISTS plate (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    carb VARCHAR(20),
    protein VARCHAR(20),
    fat VARCHAR(20)
)