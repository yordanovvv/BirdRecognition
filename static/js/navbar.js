function onLoadIndex() {
    let userCred = JSON.parse(sessionStorage.getItem("userCred"));

    if(userCred) {
        // logged in
        //Remove Sign up link in Navbar
        let signup_link = document.getElementById("signup_link");
        signup_link.parentNode.removeChild(signup_link);

        //Remove Login link in navbar
        let login_link = document.getElementById("login_link");
        login_link.parentNode.removeChild(login_link);

        //Show Gallery link in navbar
        let gallery_linkDIV = document.getElementById("gallery_link");
        let gallery_link = document.createElement("a");
        gallery_link.setAttribute("href", "/gallery");
        gallery_link.setAttribute("class", "list-group-item list-group-item-action bg-light");
        gallery_link.innerText = "Gallery";
        gallery_linkDIV.appendChild(gallery_link);

        let signout_link = document.createElement("a");
        signout_link.setAttribute("href", "/");
        signout_link.setAttribute("class", "list-group-item list-group-item-action bg-light");
        signout_link.innerText = "Sign out";
        document.getElementById("sidebar-elements").appendChild(signout_link);

        signout_link.addEventListener('click', signOut);


        if (window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1) === "") {
            let greetParagraph = document.getElementById("greet");
            greetParagraph.innerText = "Hello there, " + userCred.user.displayName + "!";
        }
    }
}

function signOut() {
    let userCred = sessionStorage.getItem("userCred");

    if(userCred) {
        sessionStorage.removeItem("userCred");
    }
}

window.addEventListener('load', onLoadIndex);