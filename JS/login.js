import { validation, errorShow } from "./global.js";
import supabase from "./credentials.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const btn_submit = document.querySelector(".btn-submit");


btn_submit.addEventListener("click", async (e) => {

    e.preventDefault();

    const loginValidate = validation(
        false,
        email.value,
        password.value,
        false,
        undefined
    )

    if (loginValidate === false) {
        return false;
    }

    btn_submit.innerHTML = `<span class="spinner"></span>`;
    btn_submit.disabled = true;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })




        if (!error) {

            Swal.fire({
                title: "Account matched!",
                text: "Your account has been match successfully.",
                icon: "success",
            })

            setTimeout(() => {
                window.location.replace("../HTML/dashboard.html")
            }, 2000)

        }

        else {

            errorShow(error.message)

            btn_submit.innerHTML = `Log In`;
            btn_submit.disabled = false;

        }

    } catch (error) {
        console.log(error);
        errorShow("Something went wrong!")

    }

});






// catch kab chalay ga pata nhi chal raha ha
// is ko check kerna ha