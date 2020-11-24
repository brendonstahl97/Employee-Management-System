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
                choices: ['View all Employees'],
                name: 'option'
            }
        ])

        this.option = option;
        this.enactOption();
    }

    // selects appropriate method based on user selection
    enactOption() {

        switch(this.option) {
            case 'View all Employees':
                console.log("viewing all employees")
                this.viewAllEmployees();
                break;
        }
    }

    viewAllEmployees() {
        console.log("all Employees");
        this.connection.query(`SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Role', role.salary AS 'Salary', department.name AS 'Department', CONCAT(managers.first_name, ' ', managers.last_name) AS 'Manager'
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id 
        INNER JOIN department ON role.department_id = department.id 
        LEFT JOIN employee AS managers On employee.manager_id = managers.id;`, (err, res) => {
            if (err) throw err;
            console.table(res);
        })

        this.getOption();
    }
}

module.exports = Options;