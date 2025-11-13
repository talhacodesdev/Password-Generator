const options = document.querySelectorAll('.options');
const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const characters = document.querySelectorAll('.characters');
const passwordInput = document.querySelector('#password-input');
const copyButton = document.querySelector('#copy-button');
const copyIcon = document.querySelector('#copy-icon');
const checkIcon = document.querySelector('#check-icon');
const alert = document.querySelector('#alert');

const passwordItem = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()_+-=',
};

// alert
const alertMessage = (text) => {
  alert.removeAttribute('hidden');
  alert.innerHTML = text;
  setTimeout(() => {
    alert.setAttribute('hidden', '');
  }, 2000);
};

// Function to generate the password
function run() {
  let password = '';
  let passwordValue = '';
  // Update the range value when the range input is changed
  rangeValue.textContent = range.value;

  // Get the checked options
  const checkedOptions = Array.from(characters)
    .filter((character) => character.checked)
    .map((character) => character.value);

  if (checkedOptions.length === 0) {
    passwordInput.value = '';
    alertMessage('Please select at least one <strong>option</strong>...');
    return;
  }

  // Generate the password
  checkedOptions.forEach((option) => {
    passwordValue += passwordItem[option];
  });

  // Generate the password
  for (let i = 0; i < range.value; i++) {
    password += passwordValue[Math.floor(Math.random() * passwordValue.length)];
  }

  passwordInput.value = password;
}

// Add event listener to each option
options.forEach((option) => {
  option.addEventListener('change', () => {
    run();
  });
});

// Add event listener to the copy button
copyButton.addEventListener('click', () => {
  copyIcon.style.display = 'none';
  checkIcon.style.display = 'block';
  alertMessage('Password copied to clipboard!');
  setTimeout(() => {
    copyIcon.style.display = 'block';
    checkIcon.style.display = 'none';
  }, 2000);
  navigator.clipboard.writeText(passwordInput.value);
});

run();
