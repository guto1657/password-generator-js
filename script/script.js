//Get the elements from the HTML document
const rangeValue = document.querySelector('#rangeNumber');
const rangefield = document.querySelector('#rangeField');
const btn = document.getElementById('btn');
const clipboard = document.getElementById('clipboard');

//function to handle the input range field
function handleInputRangeField(e) {
  //Get the target element, its min, max and value attributes
  const target = e.target;
  const min = target.min;
  const max = target.max;
  const val = target.value;

  //Set the background size of the target element according to the value
  target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';

  //Update the range value element with the value of the range field
  rangeValue.innerHTML = rangefield.value;
}

//Function to handle the creation of a new password
function handleNewPassword() {
  //Get the selected checkboxes from the HTML document
  const selectedBoxes = document.getElementsByClassName('checkboxField');
  //Get the password range from the HTML document
  const passwordRange = document.getElementById('rangeNumber').innerHTML;
  //Empty string for the charset
  let charset = '';
  //Empty string for the new password
  let newPassword = '';
  //Object for the options
  let options = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  };

  //Loop through the selected checkboxes
  for (let i = 0; i < selectedBoxes.length; i++) {
    //If the checkbox is checked, update the options and charset accordingly
    if (selectedBoxes[i].checked === true) {
      switch (selectedBoxes[i].value) {
        case 'uppercase':
          options.uppercase = true;
          charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        case 'lowercase':
          options.lowercase = true;
          charset += 'abcdefghijklmnopqrstuvwxyz';
          break;
        case 'numbers':
          options.numbers = true;
          charset += '1234567890';
          break;
        case 'symbols':
          options.symbols = true;
          charset += '$@#&!';
          break;
      }
    }
  }

  //If the password range is zero or none of the options are selected, return without creating a password
  if (
    passwordRange <= 0 ||
    (!options.lowercase &&
      !options.uppercase &&
      !options.numbers &&
      !options.symbols)
  ) {
    return;
  }

  //Initialize a variable to indicate whether the password is valid or not
  let invalidPassword = true;

  //Loop until a valid password is created
  while (invalidPassword) {
    //Call the createPassword function with the charset length, password range and charset as arguments
    newPassword = createPassword(charset.length, passwordRange, charset);
    //Call the checkPasswordStrength function with the new password and options as arguments
    const strong = checkPasswordStrength(newPassword, options);

    //If the password is strong enough, set the invalidPassword variable to false
    if (strong) {
      invalidPassword = false;
    }
  }

  //Update the password element in the HTML document with the new password
  document.querySelector('#password').value = newPassword;
}

//Function to create a password with a given length, range and charset
function createPassword(charsetLength, passwordRange, charset) {
  //Initialize an empty string for the password
  let password = '';
  //Get the size of the charset
  let charsetSize = charsetLength;
  //Loop through the password range
  for (let i = 0; i < passwordRange; i++) {
    //Append a random character from the charset to the password string
    password += charset.charAt(Math.floor(Math.random() * charsetSize));
  }
  //Return the password string
  return password;
}

//Function to check the strength of a given password and options
function checkPasswordStrength(password, options) {
  //Get the columns elements from the HTML document
  const columns = document.getElementsByClassName('column');
  //Initialize a variable for the strength level
  let strength = 0;
  //Initialize a variable to indicate whether the password is strong enough or not
  let strongEnough = true;
  //Define an object to store the colors corresponding to each strength level
  const colors = {
    0: 'rgb(246, 74, 74)',
    1: 'rgb(251, 124, 88)',
    2: 'rgb(248, 205, 101)',
    3: 'rgb(164, 255, 175)',
  };

  if (!password.match(/[a-z]+/) && options.lowercase) {
    strongEnough = false;
  } else if (password.match(/[a-z]+/) && options.lowercase) {
    strength += 1;
  }

  if (!password.match(/[A-Z]+/) && options.uppercase) {
    strongEnough = false;
  } else if (password.match(/[A-Z]+/) && options.uppercase) {
    strength += 1;
  }

  if (!password.match(/[0-9]+/) && options.numbers) {
    strongEnough = false;
  } else if (password.match(/[0-9]+/) && options.numbers) {
    strength += 1;
  }

  if (!password.match(/[$@#&!]+/) && options.symbols) {
    strongEnough = false;
  } else if (password.match(/[$@#&!]+/) && options.symbols) {
    strength += 1;
  }

  //Loop through the columns elements
  for (let i = 0; i < columns.length; i++) {
    columns[i].style.background = 'transparent';
  }

  //Set the background color of each column to the corresponding color
  for (let i = 0; i < strength; i++) {
    columns[i].style.background = colors[i];
  }

  //Return the strongEnough variable
  return strongEnough;
}

//Function to copy the password to the clipboard
function copyPassword() {
  password.select();
  password.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(password.value);
}

//Event listeners
btn.addEventListener('click', handleNewPassword);
rangefield.addEventListener('input', handleInputRangeField);
clipboard.addEventListener('click', copyPassword);
