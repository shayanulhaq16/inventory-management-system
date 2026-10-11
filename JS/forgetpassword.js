import supabase from "./credentials.js";
import { errorShow } from "./global.js";


const email = document.getElementById("email");
const submitBtn = document.querySelector(".btn-submit")

// const emailValidation = () => {
    
// }


submitBtn.addEventListener("click", async (e) => {
    
    e.preventDefault();

    try {

        const {error, data} = await supabase.auth.resetPasswordForEmail(email.value, {
          redirectTo: 'https://inventory-management-system-drab-five.vercel.app/HTML/resetpasword.html',
        })

        if(error){
            errorShow(error.message);
        }
        
    } catch (error) {
        console.log(error);        
        errorShow(error);
    }

    console.log("Success");
    
})














