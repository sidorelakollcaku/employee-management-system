INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Legal");


INSERT INTO role (title, salary, department_id) VALUES ("Engineer", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Person", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Manager", 250000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 300000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Law Manager", 500000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Matt", "Wiec", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jenn", "Wiebs", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Nick", "Miller", 2, null);