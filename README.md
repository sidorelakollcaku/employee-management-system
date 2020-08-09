# Employee Management System
![](https://img.shields.io/badge/license-MIT%20License-blue?style=flat-square)

## Creator
Matt Wieciech

#### Created On: 08/07/2020 

​![Product Logo](./images/ems-ss.png) 

## Description
Command line interface application that takes in input from a user to build out a database of departments, roles, and employees. User can create new departments, roles, and emplyees, view a list of those items, and update employee roles. Technologies used are nodejs, mysql, inquirer, and cTable.
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)

## Installation
1. Run employee-schema.sql in mySQL workbench to create database and tables
2. Run seed.sql in mySQL workbench to feed in dummy data (optional)
3. Run npm install from command line
4. Run node index.js to launch application

## Usage
App launches with a list of options, either to view department, role, or employee data, or to add a new item to one of those lists. Employee roles can also be updated. Departmens have a name and associated ID number. Roles have a title, salary, ID number, and a dept ID number to connect them to a particualr department. Employees hava a first name, last name, role ID number to connect them to a particular role, and a manager ID number which connects them with another employee as manager.

## License
This project is convered under the MIT License.

## Questions
For questions about this project, please see my GitHub at [wheaties5588](https://github.com/wheaties5588), or reach out by email at matt.wieciech@gmail.com.