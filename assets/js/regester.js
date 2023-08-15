// Selecting form and input elements
const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

// Function to display error messages
const showError = (field, errorText) => {
  field.classList.add("error");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest(".form-group").appendChild(errorElement);
};

// Function to handle form submission
const handleFormData = (e) => {
  e.preventDefault();

  // Retrieving input elements
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  // const dateInput = document.getElementById("date");
  const genderInput = document.getElementById("gender");

  // Getting trimmed values from input fields
  const fullname = fullnameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const gender = genderInput.value;

  // Regular expression patterns

  const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;
  const userNamePattern = /^[a-z\d]{5,12}$/i;
  const passwordPattern = /^[\w@-]{8,20}$/;

  // Clearing previous error messages
  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  // Performing validation checks
  if (fullname === "" || !userNamePattern.test(fullname)) {
    showError(fullnameInput, "Enter a valid full name");
  }
  if (!emailPattern.test(email)) {
    showError(emailInput, "Enter a valid email address");
  }
  if (password === "" || !passwordPattern.test(password)) {
    showError(passwordInput, "Enter your password");
  }

  if (gender === "") {
    showError(genderInput, "Select your gender");
  }

  // Checking for any remaining errors before form submission
  const errorInputs = document.querySelectorAll(".form-group .error");
  if (errorInputs.length > 0) return;

  // Submitting the form
  form.submit();
};

// Toggling password visibility
passToggleBtn.addEventListener("click", () => {
  passToggleBtn.className =
    passwordInput.type === "password"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Handling form submission event
form.addEventListener("submit", handleFormData);
const setUserData = () => {
  console.log("hellow");
  const fullNameInput = document.getElementById("fullname");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const user = {
    fullName: fullNameInput.value.toLowerCase(),
    emailAddress: emailInput.value,
    password: passwordInput.value,
  };
  const saveEmailAddress = localStorage.setItem("user", JSON.stringify(user));
};

// Handling form submission event
