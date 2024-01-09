// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt("How many characters would you like your password to be? (8-128 characters)"));

  if (isNaN(length) === true || length < 8 || length > 128) {
    alert("Password length must be a number between 8 and 128");
    return;
  }

  var hasSpecialCharacters = confirm("Click OK to include special characters.");
  var hasNumericCharacters = confirm("Click OK to include numeric characters.");
  var hasLowerCasedCharacters = confirm("Click OK to include lowercase characters.");
  var hasUpperCasedCharacters = confirm("Click OK to include uppercase characters.");

  if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
    alert("You must select at least one character type.");
    return;
  }

  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters
  };

  return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex];
  return randomElement;
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  if (!options) return null;

  var possibleCharacters = [];
  var guaranteedCharacters = [];
  var finalPassword = "";

  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  for (var i = 0; i < guaranteedCharacters.length; i++) {
    finalPassword += guaranteedCharacters[i];
  }

  while (finalPassword.length < options.length) {
    var possibleCharacter = getRandom(possibleCharacters);
    finalPassword += possibleCharacter;
  }

  return finalPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}