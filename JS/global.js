import supabase from "./credentials.js";


const errorShow = (errorText) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorText,
    });
}


const validation = async (name, email, password, conformPassword, checkbox) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name !== false) {
        if (name.trim().length < 3) {
            errorShow("Please Enter a valid name!")
            return;
        }
    }

    if (email !== false) {
        if (!emailRegex.test(email)) {
            errorShow("Please Enter a valid email!");
            return;
        }
    }

    if (password !== false) {
        if (password.length < 8) {
            errorShow("Please Enter a valid password!");
            return;
        }
    }

    if(conformPassword !== false){
        if (password !== conformPassword) {
            errorShow("Please Enter a same password to verify!")
            return;
        }
    }

    if (checkbox !== false) {
        if (!checkbox) {
            errorShow("Please read our terms and condition then agree!")
            return;
        }
    }

    // Loading State
    signupBtn.innerHTML = `<span class="spinner"></span>`;

    // Supabase Signup
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name,
            }
        }
    });

    if (error) {

        signupBtn.innerHTML = `<span class="btn-text">Sign Up</span>`;


        errorShow(error.message);
    }

    else {

        Swal.fire({
            title: "Account Created!",
            text: "Your account has been created successfully.",
            icon: "success",
        })

        setTimeout(() => {
            window.location.replace("../HTML/dashboard.html")
        }, 1500)




    }

};

export default validation;