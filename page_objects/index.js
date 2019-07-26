const {LoginPage, EmployeesPage} = require('./pages');

module.exports = {
  employeesPage: new EmployeesPage(),
  loginPage: new LoginPage()
};
