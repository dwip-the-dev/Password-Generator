// DOM elements
const passwordBox = document.getElementById("passwordBox");
const strengthBox = document.getElementById("strength");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

// Update length display
lengthInput.addEventListener("input", function() {
  lengthValue.textContent = lengthInput.value;
});

// Generate Password function
function generatePassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (document.getElementById("uppercase").checked) chars += upper;
  if (document.getElementById("lowercase").checked) chars += lower;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;

  if (chars === "") return ""; // no option selected

  let password = "";
  let length = Number(lengthInput.value);

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

// Check password strength
function checkStrength(password) {
  if (password.length < 6) {
    strengthBox.textContent = "Weak 🔴";
    strengthBox.style.color = "red";
  } else if (password.length < 10) {
    strengthBox.textContent = "Medium 🟡";
    strengthBox.style.color = "orange";
  } else {
    strengthBox.textContent = "Strong 🟢";
    strengthBox.style.color = "green";
  }
}

// Button events
document.getElementById("generateBtn").addEventListener("click", function() {
  let pass = generatePassword();
  if (pass === "") {
    alert("Please select at least one option!");
    return;
  }
  passwordBox.textContent = pass;
  checkStrength(pass);
});

// Copy to clipboard
document.getElementById("copyBtn").addEventListener("click", function() {
  if (passwordBox.textContent === "") {
    alert("No password to copy!");
    return;
  }
  navigator.clipboard.writeText(passwordBox.textContent);
  alert("Password copied to clipboard!");
});
