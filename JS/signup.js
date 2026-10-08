
import validation from "./global.js"

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const checkbox = document.getElementById("terms");

const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");


// const validation = async () => {




//     if (fullName.value.length < 3) {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Please Enter a valid name!",
//         });
//         return;
//     }
//     else if (!emailRegex.test(email.value)) {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Please Enter a valid email!",
//         });
//         return;
//     }
//     else if (password.value.length < 8) {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Please Enter a valid password!",
//         });
//         return;
//     }
//     else if (password.value !== confirmPassword.value) {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Please Enter a same password to verify!",
//         });
//         return;
//     }
//     else if (!checkbox.checked) {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Please read our terms and condition then agree!",
//         });
//         return;
//     }

//     // Loading State
//     signupBtn.innerHTML = `<span class="spinner"></span>`;

//     // Supabase Signup
//     const { data, error } = await supabase.auth.signUp({
//         email: email.value,
//         password: password.value,
//         options: {
//             data: {
//                 full_name: fullName.value
//             }
//         }
//     });

//     if (error) {

//         signupBtn.innerHTML = `<span class="btn-text">Sign Up</span>`;


//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: error.message,
//         });

//     }

//     else {

//         Swal.fire({
//             title: "Account Created!",
//             text: "Your account has been created successfully.",
//             icon: "success",
//         })

//         setTimeout(() => {
//             window.location.replace("../HTML/dashboard.html")
//         }, 1500)

       


//     }

// };



signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validation(fullName.value, email.value, password.value, confirmPassword.value, checkbox.checked); 
})

