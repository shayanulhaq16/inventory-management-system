export const errorShow = (errorText) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorText,
    });
}


export function validation(name, email, password, conformPassword, checkbox){

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name !== false) {
        if (name.trim().length < 3) {
            errorShow("Please Enter a valid name!")
            return false;
        }
    }

    if (email !== false) {
        if (!emailRegex.test(email)) {
            errorShow("Please Enter a valid email!");
            return false;
        }
    }

    if (password !== false) {
        if (password.length < 8) {
            errorShow("Please Enter a valid password!");
            return false;
        }
    }

    if(conformPassword !== false){
        if (password !== conformPassword) {
            errorShow("Please Enter a same password to verify!")
            return false;
        }
    }

    if (checkbox === false) {
            errorShow("Please read our terms and condition then agree!")
            return false;
    }

    return true;
};

