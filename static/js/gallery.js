function loadGallery() {
    let imagesDIV = document.getElementById("images");
    let userCred = JSON.parse(sessionStorage.getItem("userCred"));

    if(userCred) {
        // Create a root reference
        let storageRef = firebase.storage().ref();
        let username = userCred.user.displayName;

        // Create a child reference
        let imagesRef = storageRef.child('images/' + username +'/');

        // imagesRef now points to 'images/username'
        imagesRef.listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                // All the items under listRef.
                itemRef.getDownloadURL().then(function (url) {
                let img = document.createElement("img");
                let imgDIV = document.createElement("div");
                imgDIV.setAttribute("class", "image-div")
                img.src = url;
                imgDIV.appendChild(img);
                imagesDIV.appendChild(imgDIV);
                });



            });
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }
    else{
        let headingOops = document.createElement("h3");
        headingOops.innerText = "Oops...";
        let para = document.createElement("p");
        para.innerText = "It appears that you do not have any images in your gallery. Try analyzing a picture for what bird is on it and the photo will be saved here."
        imagesDIV.appendChild(headingOops);
        imagesDIV.appendChild(para);
    }
}

window.addEventListener('load', loadGallery);