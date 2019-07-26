const {LoginPage, EmployeesPage, EditEmployeePage, NewEmployeePage} = require('./pages');

module.exports = {
  employeesPage: new EmployeesPage(),
  loginPage: new LoginPage(),
  editEmployeePage: new EditEmployeePage(),
  newEmployeePage: new NewEmployeePage(),
};
