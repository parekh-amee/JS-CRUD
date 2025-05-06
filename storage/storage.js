

  // create methods to perform operations like save/edit/delete/add data

  export function setData(employeeData  /* should an array of obj */) {
    try {
      localStorage.setItem('employeeData', JSON.stringify(employeeData));
      return { status: true };
    } catch (error) {
      return { status: false, error: error };
    }
  }

  export function getData() {
    try {
      const employeeData = JSON.parse(localStorage.getItem('employeeData')) ?? [];
      return { status: true, employeeData: employeeData };
    } catch (error) {
      return { status: false, error: error };
    }
  }

  export function getSingleData(editRowId) {
    try {
      const storedData = getData().employeeData; //array of objects [{},{}]

      const rowToUpdate = storedData.filter((val) => val.userId === editRowId);

      return { status: true, rowToUpdate: rowToUpdate };
    } catch (error) {
      return { status: false, error: error };
    }
  }

  export function editData(dataObj /*object {}*/) {

    try {
      const storedData = getData().employeeData; //array of objects [{},{}]

      const rowId = storedData.findIndex((val) => val.userId === dataObj.userId);
      storedData.splice(rowId, 1, dataObj);
      localStorage.setItem('employeeData', JSON.stringify(storedData));
      return { status: true };
    } catch (error) {
      return { status: false, error: error };
    }
  }
  export function deleteData(deleteRowId /*userId as a string*/) {
    try {
      const { employeeData } = getData(); //array of objects [{},{}]

      const updatedData = employeeData.filter((val) => val.userId !== deleteRowId);
      localStorage.setItem('employeeData', JSON.stringify(updatedData));
      return { status: true };
    } catch (error) {
      return { status: false, error: error };
    }
  }
  export function addData(dataObj /*object {}*/) {


    try {
      const { employeeData } = getData(); //array of objects [{},{}]
      employeeData.push(dataObj);
      localStorage.setItem('employeeData', JSON.stringify(employeeData));
      return true;
    } catch (error) {
      return { status: false, error: error };
    }
  }
