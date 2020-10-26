const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Moon4anal",
    database: "employee_trackerDB"
});
startTracker();

function startTracker() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "Would you like to do?",
            choices: ["View all employees", "View all employees by department", "View employee roles", "Update employee roles", "Add employee", "Add department", "Add role to employee", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.task === "Add employee") {
                // prompt questions to create employee
                createEmployee();
            }
            else if (answer.task === "View all employees") {
                // display list in console
                connection.query("SELECT * FROM employee", function(err, data){
                    if(err)throw err;
                    console.table(data);
                })
                startTracker();
            
            }
            
            else if (answer.task === "Update employee") {
                // make a function to update table
            }

            else if (answer.task === "View all employees by department") {
                // make a function to list employees by department
            }
            else if (answer.task === "View employee roles") {
                // make a function to list employees by role
                connection.query("SELECT * FROM employee", function(err, res){
                    if(err)throw err;
                    console.table(res.employee.role_id);
                })
                startTracker();
            }
            else if (answer.task === "Add department") {
                // make a function to add department"
            }
            else if (answer.task === "Add role to employee") {
                // make a function to add role to employee"
            }
            else if (answer.task === "Update employee roles") {
                // make a function to add role to employee"
                // function addRole();
            }
            else {
                connection.end();
            }

        });

    function createEmployee() {
        inquirer
            .prompt([
                {
                    name: "role",
                    message: "What is the employee's role?",
                    type: "list",
                    choices: ["Software Engineer", "Salesperson", "Lead Engineer", "Sales lead", "Accountant"]
                },
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
                    name: "manager",
                    type: "input",
                    message: "Who is the employee's manager?"
                }
            ]).then(function (answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                    "INSERT INTO employee",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.role,
                        manager_id: answer.manager
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        // re-prompt the user 
                        startTracker();
                    }
                );
            });
    }
}

// function updateEmployee() { }
// function addRole() {
    // inquirer
    //     .prompt([
    //         {
    //             name: "role",
    //             message: "What is the employee's role?",
    //             type: "list",
    //             choices: ["Software Engineer", "Salesperson", "Lead Engineer", "Sales lead", "Accountant"]

    //         }
    //     ]).then(function (answer) {
    //         connection.query(
    //             "UPDATE employee SET role_id",
    //             [{
    //                 role_id: answer.role
    //             }],
    //             function (error) {
    //                 if (error) throw err;
    //                 startTracker();
    //             }
    //         )

    //     })
    // }
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

