
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const checkbox = document.getElementById("terms");

const submitBtn = document.querySelector(".btn-submit");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const validation = () => {

    if (fullName.value.length < 3) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid name!",
        });
        return;

    }
    else if (emailRegex.test(email.value) !== true) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid email!",
        });
        
        return;
        
    }
    else if (password.value.length < 8) {
        
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid password!",
        });
        return;
        
    }
    else if (password.value !== confirmPassword.value) {
        
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a same password to verify!",
        });
        return;
        
    }
    else if (checkbox.checked === false) {
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please read our terms and condition then agree!",
        });
        return;

    }


    window.location.replace("HTML/dashboard.html");
}

submitBtn.addEventListener("click", validation)