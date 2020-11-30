const inquirer = require('inquirer');
const mysql = require('mysql');

// Class for selecting and enacting option choices
class Options {
    constructor(connection) {
        this.option;
        this.connection = connection;
    }

    // prompts user for an option
    async getOption() {
        const { option } = await inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View all Employees', 'View Departments', 'View Roles', 'Add Department', 'Add Employee', 'Add Role', 'Exit'],
                name: 'option'
            }
        ])

        this.option = option;
        console.log(this.option);
        this.enactOption();
    }

    // selects appropriate method based on user selection
    enactOption() {

        switch (this.option) {
            case 'View all Employees':
                this.viewAllEmployees();
                break;
            case 'View Departments':
                this.viewDepartments();
                break;
            case 'View Roles':
                this.viewRoles();
                break;
            case 'Add Department':
                this.addDepartment();
                break;
            case 'Add Employee':
                this.addEmployee();
                break;
            case 'Add Role':
                this.addRole();
                break;
            case 'Exit':
                this.connection.end();
                break;
        }
    }

    viewAllEmployees() {
        this.connection.query(`SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Role', role.salary AS 'Salary', department.name AS 'Department', CONCAT(managers.first_name, ' ', managers.last_name) AS 'Manager'
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id 
        INNER JOIN department ON role.department_id = department.id 
        LEFT JOIN employee AS managers On employee.manager_id = managers.id;`, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            console.log('\n');
            this.getOption();
        })
    }

    viewDepartments() {
        console.log('mega Dept call');
        this.connection.query(`SELECT name AS 'Department' FROM department;`, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            console.log('\n');
            this.getOption();
        })
    }

    viewRoles() {
        this.connection.query(`SELECT role.title AS 'Role', role.salary AS 'Salary', department.name AS 'Department' FROM role INNER JOIN department ON role.department_id = department.id;`, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            console.log('\n');
            this.getOption();
        })
    }

    async addDepartment() {
        const { deptName } = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the new department?',
                name: 'deptName'
            }
        ])

        this.connection.query(`INSERT INTO department (name) VALUES ('${deptName}')`, (err, res) => {
            if (err) throw error;
            console.log(`${deptName} added to Departments!`);
            this.getOption();
        });
    }

    async addEmployee() {

        this.connection.query(`SELECT title FROM role`, async (err, res) => {
            if (err) throw err;
            let roles = [];
            res.forEach(element => {
                roles.push(element.title);
            })


            const { employeeFirstName, employeeLastName, employeeRole } = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name: 'employeeFirstName'
                },
                {
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                    name: 'employeeLastName'
                },
                {
                    type: 'list',
                    message: 'What role does the employee have',
                    choices: roles,
                    name: 'employeeRole'
                }
            ])

            const roleNum = roles.findIndex(element => {
                return element == employeeRole;
            })

            this.connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${employeeFirstName}', '${employeeLastName}', '${roleNum}')`, (err, res) => {
                if (err) throw error;
                // console.log(`${deptName} added to Departments!`);
                this.getOption();
            });

        });


    }

    addRole() {
        this.connection.query();

    }
}

module.exports = Options;