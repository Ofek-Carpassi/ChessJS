const xlsx = require('xlsx');
const fs = require('fs');

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Read the existing XLSX file
  const workbook = xlsx.readFile('users.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Get the last row number
  const lastRow = worksheet['!lastrow'] || 0;

  // Add the new user data
  const newRow = lastRow + 1;
  worksheet[`A${newRow}`] = { v: username };
  worksheet[`B${newRow}`] = { v: password };

  // Write the updated workbook to the XLSX file
  xlsx.writeFile(workbook, 'users.xlsx');

  // Redirect to game.html or display a success message
  window.location.href = 'game.html';
});