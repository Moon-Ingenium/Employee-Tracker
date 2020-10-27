
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
CREATE TABLE role(
id INT not null AUTO_INCREMENT,
title VARCHAR(30) not null,
salary DECIMAL(10,2) null,
department_id  int null,
PRIMARY KEY(id)
  );

CREATE TABLE employee(
id INT not null AUTO_INCREMENT,
first_name VARCHAR(30) not null,
last_name VARCHAR(30) not null,
role_id  int not null,
manager_id INT null,
PRIMARY KEY(id)
  );

CREATE TABLE department(
id INT not null AUTO_INCREMENT,
name VARCHAR(30) not null,
PRIMARY KEY(id)
  );

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(mng.first_name," ", mng.last_name) AS manager
FROM employee
INNER JOIN role ON empployee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee AS mng ON employee.manager_id = mng.id;
INSERT INTO department (name)
VALUES ("Engineering"), ("Salesperson"), ("Accounting");



INSERT into role (title, department_id)
values("Software Engineer",1), ("Salesperson",2), ("Lead Engineer",1), ("Sales lead", 2), ("Accountant",3);
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Michelle", "Moon", 1, 0), ("Sarah", "Kyle", 2, 1), ("Doug", "Diaz", 4, 2),("Kyle", "Kluck", 3, 3), ("Mike", "George", 5, 0);