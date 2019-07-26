const faker = require('faker');
const moment = require('moment');

/**
 * @returns {Object} employee
 * @returns {string} employee.fistName
 * @returns {string} employee.lastName
 * @returns {string} employee.startDate
 * @returns {string} employee.email
 */
const getAnyEmployee = () => {
  return {
    fistName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    startDate: moment(faker.date.between(2000-01-01, 2019-01-01)).format('YYYY-MM-DD'),
    email: faker.internet.email()
  };
};

module.exports = {getAnyEmployee};