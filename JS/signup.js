import { validation, errorShow } from "./global.js";
import supabase from "./credentials.js";


const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const checkbox = document.getElementById("terms");

const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");



signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();
    const validationFunc = validation(
        fullName.value,
        email.value,
        password.value,
        confirmPassword.value,
        checkbox.checked);

    if (validationFunc === false) {
        return false;
    }

    // Loading State
    signupBtn.innerHTML = `<span class="spinner"></span>`;
    signupBtn.disabled = true;

    try {

        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    full_name: fullName.value,
                }
            }
        })

        

        if (!error) {

            Swal.fire({
                title: "Account Created!",
                text: "Your account has been created successfully.",
                icon: "success",
            })

            setTimeout(() => {
                window.location.replace("../HTML/login.html")
            }, 2000);


        }
        else{

            signupBtn.innerHTML = `<span class="btn-text">Sign Up</span>`;
            signupBtn.disabled = false;
        
        
            errorShow(error.message);
        }
        
    }
    catch (error) {

        errorShow("Something went wrong!")
    }


})









// catch kab chalay ga pata nhi chal raha ha
// is ko check kerna ha