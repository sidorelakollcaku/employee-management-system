var inquirer = require('inquirer');
var mysql = require('mysql');


//Define db connnection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});


//Start db connection and notify user with prompt
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
  });
  
  
  
main = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "mainList",
            choices: [
                "Create a new department",
                "Create a new role",
                "Add a new employee",
                "Exit"
            ]
        }
    ]).then((res) => {
        
        //Switch statement to handle response
        switch (res.mainList) {
            case "View all employees":
                viewEmployees();
                break;
            case "Create a new department":
                createDepartment();
                break;
            case "Create a new role":
                createRole();
                break;
            case "Add a new employee":
                createEmployee();
                break;
            case "Exit":
                connection.end();
                break;   
        }
    }).catch(err => {
        if(err.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
          } else {
            console.log(err);
          }
    })
}



//Function to create a department
createDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the department? "
        }
    ]).then( response => {
        connection.query("INSERT INTO department (name) VALUES (?)", response.deptName, function(err, res) {
            if (err) throw err;
            
            console.log("Succesfully created " + response.deptName + " department.\n");
            
            main();
        });
        
    })
}


//Function to create a role
createRole = () => {
    
}


//Function to create an employee
createEmployee = () => {
    
}


//Function to view all employees
viewEmployees = () => {
    
}