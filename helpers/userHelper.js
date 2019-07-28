const faker = require('faker');
const moment = require('moment');

/**
 * @returns {Object} employee
 * @returns {string} employee.firstName
 * @returns {string} employee.lastName
 * @returns {string} employee.startDate
 * @returns {string} employee.email
 */
const getAnyEmployee = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    startDate: moment(faker.date.between(2000-01-01, 2019-01-01)).format('YYYY-MM-DD'),
    email: faker.internet.email()
  };
};

/**
 * @returns {Object} user
 * @returns {string} user.name
 * @returns {string} user.password
 */
const getAnyUser = () => {
  return {
    name: `${faker.name.firstName()}_${faker.name.lastName()}`,
    password: faker.internet.password(),
  };
};

module.exports = {getAnyEmployee, getAnyUser};