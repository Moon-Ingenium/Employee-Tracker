var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
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

function startTracker(task) {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "Would you like to do?",
            choices: ["View all employees", "View all employees by department", "View employee roles", "Update employee roles", "Add employee", "Add department", "Add role to employee", "Exit"]
        })
        .then(function (task) {
            // based on their answer, either call the bid or the post functions
            if (task.choices === "Add employee") {
                // prompt questions to create employee
                createEmployee();
            }
            else if (task.choices === "View all employees") {
                // display list in console
                console.table("employees list");
            }
            else if (task.choices === "Update employee") {
                // make a function to update table
            }

            else if (task.choices === "View all employees by department") {
                // make a function to list employees by department
            }
            else if (task.choices === "View employee roles") {
                // make a function to list employees by role
            }
            else if (task.choices === "Add department") {
                // make a function to add department"
            }
            else if (task.choices === "Add role to employee") {
                // make a function to add role to employee"
            }
            else if (task.choices ==="Update employee roles") {
                // make a function to add role to employee"
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
                    "INSERT INTO employee SET ?",
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

function updateEmployee(){}
function addRole(){}

