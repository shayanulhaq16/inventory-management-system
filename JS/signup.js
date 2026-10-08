
import validation from "./global.js"

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const checkbox = document.getElementById("terms");

const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");



signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validation(fullName.value, email.value, password.value, confirmPassword.value, checkbox.checked); 
})

