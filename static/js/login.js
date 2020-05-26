function addLoginListener() {
    let loginButton = document.getElementById("submitBtn2");
    loginButton.addEventListener('click', function (ev) {

        ev.preventDefault();
        let login_form = document.getElementById("login_form");
        let email_address = login_form.elements['email_address'];
        let password = login_form.elements["password"];
        let email_address_error = document.getElementById("email_address_error_login");
        let password_error = document.getElementById("password_error_login");

        email_address_error.style.display = "none";
        password_error.style.display = "none";

        if (email_address.value === "") {
            email_address_error.textContent = "Email cannot be empty!";
            email_address_error.style.display = 'block';
            email_address_error.style.color = 'red';
            return;
        }

        auth.signInWithEmailAndPassword(email_address.value, password.value)
            .then(function (cred) {
                let credString = JSON.stringify(cred);
                sessionStorage.setItem("userCred", credString);
                window.location.href = "/";
            })
            .catch(function (error) {
                // console.log(cred);

                let errorCode = error.code;
                let errorMessage = error.message;

                if (errorCode === 'auth/user-disabled') {
                    email_address_error.textContent = "This user is disabled!";
                    email_address_error.style.display = 'block';
                    email_address_error.style.color = 'red';
                } else if (errorCode === 'auth/invalid-email') {
                    email_address_error.textContent = "Invalid email!";
                    email_address_error.style.display = 'block';
                    email_address_error.style.color = 'red';
                } else if (errorCode === 'auth/user-not-found') {
                    email_address_error.textContent = "User not found!";
                    email_address_error.style.display = 'block';
                    email_address_error.style.color = 'red';
                } else if (errorCode === 'auth/wrong-password') {
                    password_error.textContent = "Wrong password!";
                    password_error.style.display = 'block';
                    password_error.style.color = 'red';
                } else {
                    alert(errorMessage);
                }
            });


    });

}

window.addEventListener('load', addLoginListener);