const email = document.getElementById("email");
const password =  document.getElementById("password");

const submitBtn = document.querySelector(".btn-submit");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validation = () => {

    if(emailRegex.test(email.value) === false){
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid email!",
        });

        return;

    }

    if(password.value.length < 8){
         Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a valid password!",
        });

        return;

    }

    window.location.replace("../HTML/dashboard.html");

}

submitBtn.addEventListener("click", validation);