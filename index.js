var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');


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
  

//Main function with list of options
main = async () => {
    try {
        
        const inqRes = await inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "mainList",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Create a new department",
                    "Create a new role",
                    "Add a new employee",
                    "Exit"
                ]
            }
        ]);
            
        //Switch statement to handle response
        switch (inqRes.mainList) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
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
        
    } catch (err){
        if (err) throw err;
    };
}


//Function to create a department
createDepartment = async () => {
    try {
        const inqRes = await inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "What is the name of the department? "
            }
        ]);
        
        connection.query("INSERT INTO department (name) VALUES (?)", inqRes.deptName, function(err, res) {
            if (err) throw err;
            console.log("Succesfully created " + inqRes.deptName + " department.\n");
            
            main();
        });
        
    } catch {
        if (err) throw err;
    };
}


//Function to create a role async/await to account for mysql query times
createRole = async () => {
    try {   
        const deptArr = await getDeptArr();
        
        const inqRes = await inquirer.prompt([
            {
                type: "input",
                name: "role",
                message: "What is the title of the role? "
            },
            {
                type: "number",
                name: "salary",
                message: "What is the salary for this role? "
            },
            {
                type: "list",
                name: "dept",
                message: "Which department is this role paced in? ",
                choices: deptArr
            }
        ]);
            
        //Get department ID based on selected dept
        const deptId = await getDeptId(inqRes.dept);
        
        //DB query to insert the new role based on inquirer selections
        connection.query("INSERT INTO role SET ?",
            {
                title: inqRes.role,
                salary: inqRes.salary,
                department_id: deptId
            },
            function(err, res) {
                if (err) throw err;
                console.log("Succesfully created " + inqRes.role + " role.\n");
                
                main();
        });
        
    } catch (err) {
        if (err) throw err;
    }           
}


//Function to create an employee
createEmployee = async () => {
    try {
        
        //Retrieve vallues needed to create new employee and store in variables
        const rolesArr = await getRolesArr();
        const employeeArr = await getEmployeesArr();
        employeeArr.push("No Manager");
        
        const inqRes = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee? "
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee?  "
            },
            {
                type: "list",
                name: "role",
                message: "What is the new employees role? ",
                choices: rolesArr
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employees manager? ",
                choices: employeeArr
            },
            
        ]);
            
        //Get manager ID based on selected manager
        if (inqRes.manager === "No Manager") {
            var managerId = null;
        } else {
            var managerId = await getEmployeeId(inqRes.manager);
        }
        
        //Get role ID based on selected role
        const roleId = await getRoleId(inqRes.role);
        
        //DB query to insert the new role based on inquirer selections
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: inqRes.firstName,
                last_name: inqRes.lastName,
                role_id: roleId,
                manager_id: managerId
            },
            function(err, res) {
                if (err) throw err;
                console.log("Succesfully created employee " + inqRes.firstName + " " + inqRes.lastName + "\n");
                
                main();
        });
        
    } catch (err) {
        if (err) throw err;
    }      
}


//Function to view all departments
viewDepartments = () => {
    connection.query('SELECT * FROM department', function(err, res) {
        const table = cTable.getTable(res);
        console.log(table);
        main();
    });
}


//Function to view all roles
viewRoles = () => {
    connection.query('SELECT * FROM role', function(err, res) {
        const table = cTable.getTable(res);
        console.log(table);
        main();
    });
}


//Function to view all employees
viewEmployees = () => {
    connection.query('SELECT * FROM employee', function(err, res) {
        const table = cTable.getTable(res);
        console.log(table);
        main();
    });
}



//Get all departments as an array
var getDeptArr = () => {
    return new Promise((resolve, reject) => {
        var depts = [];
        connection.query('SELECT name FROM department', function(err, res) {
            if (err) {
                reject(err);
              } else {
                res.forEach(element => {
                    depts.push(element.name);
              });
              resolve(depts);
            }
        });       
    });
}



//Function to get department ID when given the department name
var getDeptId = (dept) => {  
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM department WHERE name=?', dept, function(err, resp){
          if (err) {
            reject(err);
          } else {
            resolve(resp[0].id);
          }
        });
      });
}



//Function to get an array of all of the current roles
var getRolesArr = () => {
    return new Promise((resolve, reject) => {
        var roles = [];
        connection.query('SELECT title FROM role', function(err, res) {
            if (err) {
                reject(err);
              } else {
                res.forEach(element => {
                    roles.push(element.title);
              });
              resolve(roles);
            }
        });       
    });
}


//Function to get an array of all of the current employees
var getEmployeesArr = () => {
    return new Promise((resolve, reject) => {
        var employees = [];
        connection.query('SELECT first_name, last_name FROM employee', function(err, res) {
            if (err) {
                reject(err);
              } else {
                res.forEach(element => {
                    employees.push(element.first_name + " " + element.last_name);
              });
                // console.log(res)
               resolve(employees);
            }
        });       
    });
}

//Function to get the ID of an employee
var getEmployeeId = (name) => {  
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM employee WHERE first_name=? AND last_name=?', name.split(' ') , function(err, resp){
          if (err) {
            reject(err);
          } else {
            resolve(resp[0].id);
          }
        });
      });
}


//Function to get the ID of a role
var getRoleId = (role) => {  
    return new Promise((resolve, reject) => {
        connection.query('SELECT id FROM role WHERE title=?', role , function(err, resp){
          if (err) {
            reject(err);
          } else {
            resolve(resp[0].id);
          }
        });
      });
}