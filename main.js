if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service.js').then(function(registration) {
            // Registration was successful
            //console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            //console.log('ServiceWorker registration failed: ', err);
        });
    });
}
window.onload = function() {
    setDefaultNasaDate();
    getNasaImage();
    //loadOfflineNasa();
    loadSettingsUsername();
};
let offlineNasa = [];
//Function to perform HTTP request
var get = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var result = xhr.responseText
                    result = JSON.parse(result);
                    resolve(result);
                } else {
                    reject(xhr);
                    loadOfflineNasa();
                }
            }
        };
            xhr.open("GET", url, true);
            xhr.send();
    });
};

function getNasaImage(){
    offlineNasa.length = 0;
    if(document.getElementById("nasaImageDate") != null){
        document.getElementsByClassName('nasaImage')[0].src = "";
        let date = new Date(document.getElementById("nasaImageDate").value);
        let dateNow = new Date();
        if(date > dateNow){
            document.getElementsByClassName('nasaImage')[0].src = "./images/no-image.png";
            document.getElementById("nasaImageDesc").innerText = "Er was geen foto gevonden";
            document.getElementById("nasaImageTitle").innerHTML = "Jammer!";
        }else{
            let imageDate = createDateFormat(date);
            // get('https://api.nasa.gov/planetary/apod?date='+imageDate+'&api_key=IPoZeDTBk4TzKPU6cG6b2VH0UYDnLYdYtEkC2zkY')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((response) => {
            //         console.log(response);
            //     });
            get('https://api.nasa.gov/planetary/apod?date='+imageDate+'&api_key=IPoZeDTBk4TzKPU6cG6b2VH0UYDnLYdYtEkC2zkY')
                .then(function(response) {
                    // There is an issue with the image being pulled from the API, so using a different one instead
                    let nasaFotos = document.getElementsByClassName("nasaImage");
                    for(let i = 0; i<nasaFotos.length; i++){
                        if(response.media_type != "video"){
                            offlineNasa.push(response.hdurl);
                            offlineNasa.push(response.title);
                            offlineNasa.push(response.explanation);
                            localStorage.setItem("offline", JSON.stringify(offlineNasa));
                            document.getElementsByClassName('nasaImage')[i].src = response.hdurl;
                            document.getElementById("nasaImageTitle").innerText = response.title;
                            document.getElementById("nasaImageDesc").innerText = response.explanation;

                            var image = new Image();
                            image.crossOrigin = 'use-credentials';
                            image.src = response.hdurl;
                        }else{
                            document.getElementsByClassName('nasaImage')[i].src = "./images/no-youtube.jpg";
                            document.getElementById("nasaImageTitle").innerHTML = "Geen Videos";
                            document.getElementById("nasaImageDesc").innerText = "De Url was een video en die wordt niet toegelaten";

                        }
                    }

                })
                .catch(function(err) {
                    console.log("Error", err);
                })
        }
    }else{
        console.log("geen datum");
    }
}
function Darkmode(){
    let isDarkmode = document.getElementById("darkmodeCheck").checked;
    if(isDarkmode){
        localStorage.setItem("dm", true);
    }else{
        localStorage.setItem("dm", false);
    }
    changeDarkmodeColor(isDarkmode);
}
function loadOfflineNasa(){
    let offlineData = JSON.parse(localStorage.getItem("offline"));
    console.log(offlineData);
    if(offlineData == "" || offlineData.length == 0){
        console.log("je bent online");
    }else{
        document.getElementsByClassName('nasaImage')[0].src = offlineNasa[0];
        document.getElementById("nasaImageTitle").innerHTML = offlineNasa[1];
        document.getElementById("nasaImageDesc").innerText = offlineNasa[2];
    }
}

function setDefaultNasaDate(){
    if(document.getElementById("nasaImageDate") != null){
        let defaultDate = createDateFormat(new Date());
        document.getElementById("nasaImageDate").value = defaultDate;
    }
}

function checkDarkmode(){
    let darkmodeCheck = localStorage.getItem("dm");
    if(darkmodeCheck == null || darkmodeCheck == undefined){
        localStorage.setItem("dm", false);
    }
    loadDMCheckbox();
}

function saveUsername(){
    if(document.getElementById("gebruikernaamTxt") != null){
        let username = document.getElementById("gebruikernaamTxt").value;
        localStorage.setItem("un", username);
    }
}

function loadSettingsUsername(){
    if(document.getElementById("gebruikernaamTxt") != null){
        let username = localStorage.getItem("un");
        document.getElementById("gebruikernaamTxt").value = username;
    }
}

function loadDMCheckbox(){
    let darkmode = localStorage.getItem("dm");
    if(document.getElementById("darkmodeCheck") != null){
        if(darkmode == "true"){
            document.getElementById("darkmodeCheck").checked = true;
        }else{
            document.getElementById("darkmodeCheck").checked = false;
        }
    }
        changeDarkmodeColor(darkmode);
}

function createDateFormat(date){
    return date.getFullYear() + "-" + String(date.getMonth()+1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
}

function changeDarkmodeColor(darkmode){
    //light mode
    //sidebarcontainer = floralwhite
    //headercontainer = floralwhite
    //maincontainer = whitessmoke
    //page = white
    if(darkmode == "true" || darkmode == true){
        document.getElementById("sideBarContainer").style.backgroundColor = "rgb(8, 27, 51)";
        document.getElementById("headerContainer").style.backgroundColor = "rgb(8, 27, 51)";
        document.getElementById("mainContainer").style.backgroundColor = "rgb(80, 102, 128)";
        document.getElementById("page").style.backgroundColor = "rgb(8, 27, 51)";
        let darkmodeText = document.getElementsByClassName("darkmodeText");
        for(let i = 0; i<darkmodeText.length; i++){
            darkmodeText[i].style.color = "white";
        }
    }else{
        document.getElementById("sideBarContainer").style.backgroundColor = "floralwhite";
        document.getElementById("headerContainer").style.backgroundColor = "floralwhite";
        document.getElementById("mainContainer").style.backgroundColor = "whitesmoke";
        document.getElementById("page").style.backgroundColor = "floralwhite";
        let darkmodeText = document.getElementsByClassName("darkmodeText");
        for(let i = 0; i<darkmodeText.length; i++){
            darkmodeText[i].style.color = "black";
        }
    }
}