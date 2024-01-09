// Function to prompt user for password options
function getPasswordOptions() {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 128;

  let length;
  do {
    const lengthInput = window.prompt(`Password length? (${MIN_LENGTH}-${MAX_LENGTH})`);
    if (lengthInput === null) {
      alert("Password generation canceled.");
      console.log("Password generation canceled.");
      return;
    }

    length = parseInt(lengthInput, 10);

    if (isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
      alert(`Length must be a valid number between ${MIN_LENGTH} and ${MAX_LENGTH}`);
      console.log(`Length must be a valid number between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
    }
  } while (isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH);

  const lowercase = confirm("Include lowercase characters?");
  const uppercase = confirm("Include uppercase characters?");
  const numeric = confirm("Include numeric characters?");
  const special = confirm("Include special characters?");

  if (!lowercase && !uppercase && !numeric && !special) {
    alert("At least one character type must be selected.");
    console.log("At least one character type must be selected.");
    return getPasswordOptions();
  }

  return { length, lowercase, uppercase, numeric, special };
}

// Function for getting a random element from an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate password based on user's options
function generatePassword(length, selectedOptions) {
  return Array.from({ length }, () => getRandomElement(selectedOptions)).join('');
}

// Function to write password to the #password input and copy it to the clipboard
function writePassword() {
  const passwordOptions = getPasswordOptions();
  if (!passwordOptions) return; // Check if password generation was canceled
  const selectedOptions = getSelectedOptions(passwordOptions, options);
  console.log("Password length: " + passwordOptions.length);
  const password = generatePassword(passwordOptions.length, selectedOptions);
  console.log("Password: " + password);
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
  passwordText.focus();
  passwordText.select();
  navigator.clipboard.writeText(passwordText.value);

  alert("Password generated successfully and copied to the clipboard!");
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Add event listener to #generate button
generateBtn.addEventListener('click', writePassword);

// Character options
const options = {
  numeric: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  special: ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'],
  lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

// Get selected options array
function getSelectedOptions(passwordOptions, options) {
  const { lowercase, uppercase, numeric, special } = passwordOptions;
  const { numeric: num, special: spec, lowercase: lower, uppercase: upper } = options;
  const selectedOptions = [];

  if (lowercase) selectedOptions.push(...lower);
  if (uppercase) selectedOptions.push(...upper);
  if (numeric) selectedOptions.push(...num);
  if (special) selectedOptions.push(...spec);

  return selectedOptions;
}
