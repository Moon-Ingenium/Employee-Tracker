
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;
CREATE TABLE role(
id INT not null,
title VARCHAR(30) not null,
salary DECIMAL(2,3) null,
department_id  int null,
PRIMARY KEY(id)
  );

select * from employee_trackerDB;

CREATE TABLE employee(
id INT not null,
first_name VARCHAR(30) not null,
last_name VARCHAR(30) not null,
role_id  int noy null,
manager_id INT null
PRIMARY KEY(id)
  );

CREATE TABLE department(
id INT not null,
name VARCHAR(30) not null,
PRIMARY KEY(id)
  );