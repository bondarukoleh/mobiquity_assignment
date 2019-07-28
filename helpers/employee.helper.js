/* Better do such precondition via API, but time is short, and this is a test example */
function validateInstances(employeePageInstance, newEmployeePageInstance) {
  if (!employeePageInstance.hasOwnProperty('clickCreateButton')
    || !newEmployeePageInstance.hasOwnProperty('fillAddForm')
    || !newEmployeePageInstance.hasOwnProperty('clickAddButton')) {
      throw Error(`Please provide right instance`);
  }
}

/**
 * Returned function help to create employee. With little check if we pass wrong class instances.
 * @param {Object} employeesPage 
 * @param {Object} newEmployeePage
 * @returns {async () => {}} function that can create employee
 */
function getCreateEmployeeHelper(employeesPage, newEmployeePage) {
  validateInstances(employeesPage, newEmployeePage);
  return async function ({firstName, lastName, startDate, email}) {
    await employeesPage.clickCreateButton();
    await newEmployeePage.fillAddForm({firstName, lastName, startDate, email});
    await newEmployeePage.clickAddButton();
  };
}

module.exports = {getCreateEmployeeHelper};

