INSERT INTO department (name) VALUES ('Sales'), ('Accounting'), ('Human Resources'), ('Customer Service'), ('Quality Assurance');

INSERT INTO role (title, salary, department_id)
	VALUES ('Sales Manager', 100000.00, 1),
    ('Sales Associate', 60000.00, 1),
    ('Accounting Manager', 80000.00, 2),
    ('Accounting Rep', 60000.00, 2),
    ('Human Resources Manager', 80000.00, 3),
    ('Human Resources Rep', 60000.00, 3),
    ('Customer Service Rep', 60000.00, 4),
    ('Quality Assurance Rep', 60000.00, 5);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ('Jimmy', 'John', 1, NULL),
    ('John', 'Jimmy', 2, 1),
    ('Jimmy', 'Jam', 3, NULL),
    ('Jam', 'Jimmy', 4, 3),
    ('Jim', 'Beau', 5, NULL),
    ('Beau', 'Jim', 6, 5),
    ('Jimmy', 'Jungle', 7, NULL),
    ('Steve', 'Johns', 8, NULL);