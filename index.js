var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});


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
                "Add a department",
                "Add a role",
                "Add and employee",
                "Exit"
            ]
        }
    ]).then((res) => {
        console.log(res);
        if (res === "Exit") {
            connection.end();
        }
    }).catch(err => {
        if(err.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
          } else {
            console.log(err);
          }
    })
}