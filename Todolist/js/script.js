nbre = "0"

function recup(){
    
    /* Pour ajouter la tâche dans la liste */ 
    var task = document.getElementById('task').value;

    var list = document.getElementById('list_task');
    var li_task = document.createElement("li")
    list.appendChild(li_task);
    li_task.innerText = task;
    li_task.id = "task"+nbre;
   
    var u = document.getElementById('urgente');
    var u_b = document.createElement('li');
    u.appendChild(u_b)
   
    if ($('input[name=urgent]').is(':checked')) {
        u_b.style.backgroundColor = "red";
        u_b.innerText = "Urgente";
        u_b.style.color="red";
     }
     else {
        u_b.innerText = "Normale";
        u_b.style.visibility="hidden";
     }


    /* Pour avoir la date d'aujourd'hui */
    var date = new Date() 
    var mois = date.getMonth() + 1;
    var jour = date.getDay()
    var annee = date.getFullYear();

    var list_date = document.getElementById('date_no_dots').innerHTML;
    var date_txt = "date : " + jour + "/" + mois + "/" + annee; 
    var date_add = "<li>" + date_txt + "</li>" + list_date;
    document.getElementById('date_no_dots').innerHTML  = date_add;

    var c =document.createElement('li');
    var c_pere = document.getElementById('check_done');
    c_pere.appendChild(c)
     c.innerHTML="<input type=\"checkbox\" onclick = \"done(this)\" id= \""  + nbre +  "\" >";

   
    nbre = String( parseInt(nbre) + 1 );
}


function done(that){
    txt = "task"+that.id;
    
    if ( document.getElementById(txt).style.textDecoration == "line-through" )
      {
           document.getElementById(txt).style.textDecoration="";
      
        }
    else
      {
       document.getElementById(txt).style.textDecoration="line-through";
     
     }
   
}