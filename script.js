const options = document.querySelectorAll('.options');
const range = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const characters = document.querySelectorAll('.characters');
const passwordInput = document.querySelector('#password-input');
const copyButton = document.querySelector('#copy-button');
const copyIcon = document.querySelector('#copy-icon');
const checkIcon = document.querySelector('#check-icon');
const alert = document.querySelector('#alert');
const passwordStrength = document.querySelector('#password-strength');
const passwordCheck = document.querySelector('#password-check');

const passwordItem = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()_+-=',
};

// alert
const alertMessage = (text) => {
  alert.classList.add('show');
  alert.innerHTML = text;
  setTimeout(() => {
    alert.classList.remove('show');
  }, 2000);
};

// Function to generate the password
function run() {
  let password = '';
  let passwordValue = '';

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

// Add event listener to the range input
range.addEventListener('input', () => {
  rangeValue.textContent = range.value;
  run();
  if (range.value < 8) {
    passwordStrength.textContent = 'Weak';
    passwordCheck.classList.remove('text-orange-500');
    passwordCheck.classList.add('text-red-500');
  } else if (range.value < 12) {
    passwordStrength.textContent = 'Average';
    passwordCheck.classList.remove('text-red-500');
    passwordCheck.classList.add('text-orange-500');
  } else {
    passwordStrength.textContent = 'Strong';
    passwordCheck.classList.remove('text-orange-500');
    passwordCheck.classList.add('text-green-500');
  }
});

run();
