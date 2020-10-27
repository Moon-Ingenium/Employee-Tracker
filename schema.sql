
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
CREATE TABLE role(
id INT not null AUTO_INCREMENT,
title VARCHAR(30) not null,
salary DECIMAL(2,3) null,
department_id  int null,
PRIMARY KEY(id)
  );

CREATE TABLE employee(
id INT not null AUTO_INCREMENT,
first_name VARCHAR(30) not null,
last_name VARCHAR(30) not null,
role_id  int not null,
manager_id INT null
PRIMARY KEY(id)
  );

CREATE TABLE department(
id INT not null AUTO_INCREMENT,
name VARCHAR(30) not null,
PRIMARY KEY(id)
  );

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, roles.salary, CONCAT(mng.first_name," ", mng.last_name) AS manager
FROM employee
INNER JOIN role ON empployee.roles_id = roles.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee AS mng ON employee.manager_id = mng.id

INSERT INTO department (name)
VALUES (Software Engineer"), ("Salesperson"), ("Lead Engineer"), ("Sales lead"), ("Accountant");
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Michelle", "Moon", "Engineer", "Eric Scott"), ("Sarah", "Kyle", "Salesperson", "Andrew Moon"), ("Doug", "Diaz", "Sales Lead", "Carlos Costos")("Kyle", "Kluck", "Lead Engineer", "Eric Scott"), ("Mike", "George", "Accountant", "Andrew Moon");


INSERT into role (title, id, department_id)
values("Software Engineer"), ("Salesperson"), ("Lead Engineer"), ("Sales lead"), ("Accountant");

