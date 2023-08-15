// ========================= Toggling password visibility =========================
passToggleBtn.addEventListener("click", () => {
  passToggleBtn.className =
    passwordInput.type === "password"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

const setUserDataLogin = () => {
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const user = {
    emailAddress: emailInput.value,
    password: passwordInput.value,
  };
  const saveEmailAddress = localStorage.setItem("user", JSON.stringify(user));
  return true;
};
