function uploadImage() {
    let uploaded_file = document.getElementById("uploaded_file");

    uploaded_file.onchange = function (ev) {
        let resultsDIV = document.getElementById("resultDIV");
        let imageDIV = document.getElementById("imageDIV");
        let imageObject = document.getElementById("imageAnalyze");
        let step2DIV = document.getElementById("step2");
        let step3DIV = document.getElementById("step3");
        let fileList = uploaded_file.files;


        if (fileList.length >= 1) {
            let image = fileList[0];
            imageObject.src = URL.createObjectURL(image);
            if(imageObject.style.display === "none") {
                imageObject.style.display = "block";
                step2DIV.style.display = "block";
            }
        }
        else{
            imageObject.style.display = 'none';
            step2DIV.style.display = "none";
            step3DIV.style.display = 'none';
        }
    }
}

function analyzeImage(){
    let analyzeButton = document.getElementById("analyze_button");

    analyzeButton.addEventListener('click', function (ev) {
        ev.preventDefault();

        let uploaded_file = document.getElementById("uploaded_file");
        let fileList = uploaded_file.files;
        let resultsDIV = document.getElementById("resultDIV")
        let predictionElement = document.getElementById("prediction");
        let probabilityElement = document.getElementById("probability");
        let step3DIV = document.getElementById("step3");


        if (fileList.length >= 1) {
            let image = fileList[0];

            // Create a root reference
            let storageRef = firebase.storage().ref();

            let username = JSON.parse(sessionStorage.getItem("userCred")) ? JSON.parse(sessionStorage.getItem("userCred")).user.displayName : "";
            // Create a child reference
            let imagesRef = storageRef.child('images/' + username + '/' + image.name);
            // imagesRef now points to 'images'
            imagesRef.put(image).then(function (value) {

            });


            let request = new XMLHttpRequest();
                let formData = new FormData();
                formData.append("file", image, image.name);
                request.open("POST", "/analyzeImage", true);
                request.responseType = 'json';


                request.onload = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        predictionElement.innerText = request.response.prediction;
                        probabilityElement.innerText = request.response.probability + "%";
                        step3DIV.style.display = 'block';

                    }
                };

                request.send(formData);

        }

        console.log("analyzing image........");
    });
}


window.addEventListener('load', uploadImage);
window.addEventListener('load', analyzeImage);