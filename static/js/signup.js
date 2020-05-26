function addSubmitListener() {
    let submitButton = document.getElementById("submitBtn");

    submitButton.addEventListener('click', function (ev) {
        let signup_form = document.getElementById("signup_form");
        let email_address = signup_form.elements['email_address'];
        let password = signup_form.elements["password"];
        let username = signup_form.elements["username"];
        let email_address_error = document.getElementById("email_address_error");
        let password_error = document.getElementById("password_error");
        let username_error = document.getElementById("username_error");

        ev.preventDefault();

        email_address_error.style.display = "none";
        password_error.style.display = "none";
        username_error.style.display = "none";

        if (username.value === "") {
            username_error = document.getElementById("username_error");
            username_error.textContent = "Username cannot be empty!";
            username_error.style.display = 'block';
            username_error.style.color = 'red';
            return;
        }

        if (email_address.value === "") {
            email_address_error = document.getElementById("email_address_error");
            email_address_error.textContent = "Email cannot be empty!";
            email_address_error.style.display = 'block';
            email_address_error.style.color = 'red';
            return;
        }

        //         //Register user
        auth.createUserWithEmailAndPassword(email_address.value, password.value)
            .then(function (cred) {
                //Successful register

                //Add username to cred object
                cred.user.updateProfile({
                    displayName: username.value,
                    photoURL: null
                }).then(function() {
                    let credString = JSON.stringify(cred);
                    sessionStorage.setItem("userCred", credString);

                    document.forms["signup_form"].submit();
                }).catch(function(error) {
                    // An error happened.
                });


            })
            .catch(function (error) {
                //Unsuccessful register


                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/email-already-in-use') {
                    email_address_error = document.getElementById("email_address_error");
                    email_address_error.textContent = "Email already in use!";
                    email_address_error.style.display = 'block';
                    email_address_error.style.color = 'red';
                } else if (errorCode == 'auth/invalid-email') {
                    email_address_error = document.getElementById("email_address_error");
                    email_address_error.textContent = "Invalid email!";
                    email_address_error.style.display = 'block';
                    email_address_error.style.color = 'red';
                } else if (errorCode == 'auth/weak-password') {
                    password_error = document.getElementById("password_error");
                    password_error.textContent = "Password too weak!";
                    password_error.style.display = 'block';
                    password_error.style.color = 'red';
                } else {
                    alert(errorMessage);
                }
            });


    });

}

window.addEventListener('load', addSubmitListener);