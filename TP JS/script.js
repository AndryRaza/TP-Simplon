window.onload = function(){
   var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
           document.getElementById('meteo').innerText= (response.current_condition.condition);
        }
    };
    request.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
    request.send();
    

    var elt = document.createElement('p');
    elt.innerHTML = "Mon <strong>grand</strong> contenu";
    elt.classList.add('important');
    document.getElementById('main').appendChild(elt);
}