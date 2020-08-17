var quiz;    
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        quiz = JSON.parse(xhttp.responseText);
        start();
    }
    else{
        console.log(xhttp.statusText);
    }
};
xhttp.open("GET", "http://localhost:3000/quiz", true);
xhttp.send();