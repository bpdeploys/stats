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
