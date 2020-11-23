CREATE DATABASE cms_DB;
USE  cms_DB;

CREATE TABLE department (
	id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    department_id INTEGER(10) NOT NULL
);

CREATE TABLE employee (
	id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10)
);