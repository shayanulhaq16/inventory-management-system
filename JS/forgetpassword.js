import supabase from "./credentials.js";
import { errorShow } from "./global.js";


const email = document.getElementById("email");
const submitBtn = document.querySelector(".btn-submit")

submitBtn.addEventListener("click", async (e) => {
    
    e.preventDefault();

    if(!email.value){
        errorShow("Please! Enter Your Email.")
        return;
    }

    submitBtn.innerHTML = `<span class="spinner"></span>`;
    submitBtn.disabled = true;

    try {

        const {error, data} = await supabase.auth.resetPasswordForEmail(email.value, {
          redirectTo: 'https://inventory-management-system-drab-five.vercel.app/HTML/resetpasword.html',
        })


        
        if(error){
            errorShow(error.message);
        }

        submitBtn.innerHTML = `Send Reset Link`;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.log(error);        
        errorShow(error);
    }
})














