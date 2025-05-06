// regex code

const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{1,5})$/;
const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;


// check phone validation

const isPhoneNumberValid = () => {
  let phoneFieldLabel = document.getElementById("error-phone");
  if (!phone.value.match(/^\d{10}$/)) {
    phoneFieldLabel.innerText = 'Phone should be a number field with 10 digits.';
    return false;
  } else {
    phoneFieldLabel.innerText = '';
    return true;
  }
};

const name = document.getElementById('name');
const dob = document.getElementById('dob');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
// const gender = document.querySelector('input[name="gender"]:checked');


export const errorHandling = (fieldName) => {
   let flag = [];

  const emailFromLocalStorage = JSON.parse(localStorage.getItem('employeeData')) ?? [];
  // console.log(emailFromLocalStorage);
  const duplicateEmail = emailFromLocalStorage
    .map((val) => {
      return val.email;
    })
    .some((val) => val === email.value);


  //will contain all validation boolean values

  // name, gender, dob, email

  const nameFieldLabel = document.getElementById("error-name");
  const dobFieldLabel = document.getElementById("error-dob");
  const emailFieldLabel = document.getElementById("error-email");

  switch (fieldName) {
    case 'phone':
    isPhoneNumberValid();
      break;
    case 'name':
      if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
        if(name.value === ''){
          nameFieldLabel.innerText = '';
        }else{

          nameFieldLabel.innerText =
          'Name field should be between 4 to 20 characters, including only alphanumeric characters';

        }
        nameFieldLabel.focus();

        flag.splice(0, 0, false);
      } else if (name.value.match(/^[0-9]/)) {
        nameFieldLabel.innerText = 'Only alphanumeric characters';

        nameFieldLabel.focus();
        flag.splice(0, 0, false);
      }  else {
        nameFieldLabel.innerText = '';
        flag.splice(0, 0, true);
      }

      break;

    case 'dob':
    console.log("hello");
      if (!dob.value && fieldName === 'dob') {
        dobFieldLabel.innerText = 'Date of birth is required';
        dobFieldLabel.focus();
        // console.log('flag2');

        flag.splice(1, 0, false);
      } else {
        dobFieldLabel.innerText = '';
        flag.splice(1, 0, true);
      }

      break;

    case 'email':
      // console.log(email.value);

      if (!email.value.match(regexEmail) && fieldName === 'email') {
        if (email.value === '') {
          emailFieldLabel.innerText = 'Email is required';
        } else {
          emailFieldLabel.innerText = 'Invalid Email';
        }
        emailFieldLabel.focus();

        flag.splice(2, 0, false);
      } else {
        emailFieldLabel.innerText = '';
        flag.splice(2, 0, true);
      }

      break;

    default:
      if (!name.value.trim().match(/^[a-zA-Z0-9 ]{4,20}$/)) {
        nameFieldLabel.innerText =
          'Name field should be between 4 to 20 characters, including only alphanumeric characters';
        nameFieldLabel.focus();

        flag.splice(0, 0, false);
      } else {
        nameFieldLabel.innerText = '';
        flag.splice(0, 0, true);
      }
      if (!dob.value) {
        dobFieldLabel.innerText = 'Date of birth is required';
        dobFieldLabel.focus();

        flag.splice(1, 0, false);
      } else if (new Date(dob.value) >= new Date()) {
        dobFieldLabel.innerText = 'Future dates are not allowed';
        flag.splice(1, 0, false);
      } else {
        dobFieldLabel.innerText = '';
        flag.splice(1, 0, true);
      }

      if (!email.value.match(regexEmail)) {
        if (email.value === '') {
          emailFieldLabel.innerText = 'Email is required';
        } else {
          emailFieldLabel.innerText = 'Invalid Email';
        }
        emailFieldLabel.focus();

        flag.splice(2, 0, false);
      }  else {
        emailFieldLabel.innerText = '';
        flag.splice(2, 0, true);
      }
    }


    return flag;

};



// Function to check Valid data
export function checkIfInputDataIsValid() {
  let phoneNumberIsValid = true;
  if (phone.value) {
    phoneNumberIsValid = isPhoneNumberValid();
  }

  return errorHandling().every((item) => item === true) && phoneNumberIsValid;

  // return boolean
}
