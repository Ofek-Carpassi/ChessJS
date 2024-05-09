const xlsx = require('xlsx');

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Read the XLSX file
  const workbook = xlsx.readFile('users.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Check if the username and password match
  let userFound = false;
  for (let row = 2; row <= worksheet['!lastrow']; row++) {
    const storedUsername = worksheet[`A${row}`]?.v;
    const storedPassword = worksheet[`B${row}`]?.v;

    if (username === storedUsername && password === storedPassword) {
      userFound = true;
      break;
    }
  }

  if (userFound) {
    // Redirect to game.html or display a success message
    window.location.href = 'game.html';
  } else {
    // Display an error message
    alert('Invalid username or password');
  }
});