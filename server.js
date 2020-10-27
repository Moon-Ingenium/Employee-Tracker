const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const express = require("express");
const { connect } = require("http2");

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "RootPassword",
    database: "employee_trackerDB"
});

startTracker();

function startTracker() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "Would you like to do?",
            choices: ["View all employees", "View all departments", "View employee roles", "Update employee roles", "Add employee", "Add department", "Add role", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.task === "Add employee") {
                // prompt questions to create employee
                createEmployee();
            }
            else if (answer.task === "View all employees") {
                // display list in console
                connection.query("SELECT * FROM employee", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                })
                startTracker();

            }

            else if (answer.task === "Update employee") {
                // make a function to update table
            }

            else if (answer.task === "View all departments") {

                connection.query("SELECT * FROM department", function (err, departmentData) {
                    if (err) throw err;
                    // make a function to list employees by department
                    console.table(departmentData);
                })
                startTracker();
            }
            else if (answer.task === "View employee roles") {
                // make a function to list employees by role
                connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    console.table(res);
                })
                startTracker();
            }
            else if (answer.task === "Add department") {
                // make a function to add department"
                connection.connect(function (roleErr) {
                    if (roleErr) throw roleErr;
                    addDepartment();
                });
                startTracker();
            }
            else if (answer.task === "Add role") {
                // make a function to add role to employee"
                connection.connect(function (roleErr) {
                    if (roleErr) throw roleErr;
                    addRole();
                });
                startTracker();


            }
            else if (answer.task === "Update employee roles") {
               
                // make a function to add role to employee"
                connection.connect(function (roleErr) {
                    if (roleErr) throw roleErr;
                    updateEmployeeRole();
                });
                startTracker();


            }
            else {
                connection.end();
            }


        });
}
function createEmployee() {
    connection.query(
        "SELECT * FROM employee_trackerDB.employee where manager_id=0;",
        function (err, data) {

            const managerArray = data.map(manager => {
                return {
                    name: manager.first_name + " " + manager.last_name,
                    value: manager.manager_id
                }

            });


            connection.query(

                "SELECT * from role", function (roleErr, res) {

                    const roleArray = res.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    });



                    inquirer
                        .prompt([

                            {
                                name: "firstName",
                                type: "input",
                                message: "What is the employee's first name?"
                            },
                            {
                                name: "lastName",
                                type: "input",
                                message: "What is the employee's last name?"
                            },
                            {
                                name: "role",
                                message: "What is the employee's role?",
                                type: "list",
                                choices: roleArray
                            },
                            {
                                name: "manager",
                                type: "list",
                                choices: managerArray
                            }

                        ]).then(function (answer) {
                            // when finished prompting, insert a new item into the db with that info

                            connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES(?,?,?,?)",
                                [
                                    answer.firstName,
                                    answer.lastName,
                                    answer.role,
                                    answer.manager
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log("Your employee was created successfully!");
                                    // re-prompt the user 
                                    startTracker();
                                }
                            );
                        });
                }
            )
        }
    )

}


function updateEmployeeRole() {
    connection.query(

        "SELECT * from role", function (roleErr, res) {

            const newRoleArray = res.map(role => {
                return {
                    
                    value: role.id
                }
            }
        );
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            }, {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },

            {
                name: "role",
                message: "What is the new Employee role?",
                type: "list",
                choices: newRoleArray

            }
        ]).then(function (answer) {
            connection.query(
                "Update employee Where first_name = '"+ answer.firstName + "' AND last_name = '" + answer.lastName +"'",
                [
                    {
                        role_id:answer.role
                    }
                    
                ],
                function (error) {
                    if (error) throw error;
                    startTracker();
                }
            )

        })
    
}
    )}

function addRole() {
    inquirer
        .prompt([
            {
                name: "role",
                message: "What is the new role?",
                type: "list",
                choices: ["Marketing", "HR Manager", "Consultant", "Customer service representative"]

            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role(title)VALUES(?)",
                [
                    answer.role
                ],
                function (error) {
                    if (error) throw error;
                    startTracker();
                }
            )

        })
}
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                message: "What is the new department?",
                type: "list",
                choices: ["Legal", "HR", "Consultanting", "Customer Service"]

            }
        ]).then(function (answer) {

            ; connection.query(
                "INSERT INTO department(name)VALUES(?)",
                [
                    answer.department
                ],
                function (error) {
                    if (error) throw error;
                    startTracker();
                }
            )

        })

}
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

