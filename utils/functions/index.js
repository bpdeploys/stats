// Function to convert a string to PascalCase
export function convertToPascalCase(input) {
  // Remove accents and special characters
  const cleanedText = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase();

  // Split words by spaces and convert to PascalCase
  const words = cleanedText.split(' ');
  const pascalCaseText = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');

  return pascalCaseText;
}

// Function to save token to local storage
export function saveUserToken(token) {
  localStorage.setItem('token', token);
}

// Function to get token from local storage
export function getUserToken() {
  return localStorage.getItem('token');
}

// Function to remove token from local storage
export function handleLogout() {
  localStorage.removeItem('token');
}

// Function to save user to local storage
export function saveUserData(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// Function to get user from local storage
export function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

// Function to remove user from local storage
export function removeUserData() {
  localStorage.removeItem('user');
}

//Function to abbreviate player positions
export function abbreviatePosition(position) {
  const abbreviations = {
    Goalkeeper: 'GK',
    Defender: 'D',
    Midfielder: 'M',
    Forward: 'F',
  };

  return abbreviations[position] || 'F';
}

// Pick color based on background
export function pickTextColorBasedOnBgColorAdvanced(
  bgColor,
  lightColor,
  darkColor
) {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
