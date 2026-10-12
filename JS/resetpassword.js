import { errorShow } from "./global.js";
import supabase from "./credentials.js";


const resetPasswordForm = document.getElementById("resetPasswordForm");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");

const submitBtn = document.querySelector(".btn-submit");

resetPasswordForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.innerHTML = `<span class="spinner"></span>`;
    submitBtn.disabled = true;

    if (newPassword.value.trim().length < 8) {

        errorShow("Please! Enter a valid password, You need to enter at least 8 letters.")

        submitBtn.innerHTML = `Reset Password`;
        submitBtn.disabled = false;

        return;
    }
    else if (confirmNewPassword.value.trim() !== newPassword.value.trim()) {

        errorShow("Enter The Same password.")

        submitBtn.innerHTML = `Reset Password`;
        submitBtn.disabled = false;

        return;
    }

    try {

        const { data, error } = await supabase.auth.updateUser({ password: newPassword.value.trim() });

        if (!error) {
            window.location.replace("../HTML/login.html")
        }
        else {
            errorShow(error.message)

            submitBtn.innerHTML = `Reset Password`;
            submitBtn.disabled = false;
        }


    } catch (error) {

        console.log(error);
        errorShow("Something went wrong!")
    }

});