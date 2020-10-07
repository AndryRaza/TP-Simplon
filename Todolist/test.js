nbre=0; //numéro d'id des différentes lignes

var list_task = [];  //liste des tâches
var list_date = [];  //liste des dates
var list_urgent = [];   //liste de l'état d'urgence de la tâche

var first = 0; //première ligne (tâche + date + son icône)
var actualPage = 1; //on commence à la 1ère page logique !


var numberOfItems = 3; //nbre de lignes qu'on affiche

function firstPage(){
    first=0;
    actualPage = 1;
    document.getElementById('pageInfo').innerHTML = actualPage;
    showList();
}

function previous(){
    if ( first - numberOfItems >= 0)
    {
     first -= numberOfItems;
     actualPage--;
     document.getElementById('pageInfo').innerHTML = actualPage;
     showList();
     }
}


function nextPage(){
    if ( first + numberOfItems <= list_task.length)
   { first += numberOfItems;
    actualPage++;
    document.getElementById('pageInfo').innerHTML = actualPage;
    showList();
    }
}

function lastPage(){
    var maxPages = Math.ceil(list_task.length / numberOfItems); //numéro de la dernière page
    first = (maxPages * numberOfItems) - numberOfItems;
    actualPage = maxPages;
    document.getElementById('pageInfo').innerHTML = actualPage;
    showList();
}

/* Récupérer la tâche dans une liste */ 

function recup(){
    var task = document.getElementById('task').value;
    list_task.push(task);  
    document.getElementById('pageInfo').innerHTML = actualPage;

   
    if ($('input[name=urgent]').is(':checked')) {
        list_urgent.push("urgente");
     }
     else {
        list_urgent.push("not_urgente");
     }

    /* Pour avoir la date d'aujourd'hui */
    var date = new Date() 
    var mois = date.getMonth() + 1;
    var jour = date.getDate()
    var annee = date.getFullYear();

    var date_txt =  jour + "/" + mois + "/" + annee; 

    list_date.push(date_txt);

    nbre++;

    showList();
}

/* Montrer la tâche dans le tableau prévu pour */ 
function showList(){
    let tableList = "";
    for (let i = first; i < first + numberOfItems ; i++ ){
        if(i<list_task.length){
            tableList += `
            <tr > 
            <td id=${list_urgent[i]}> </td>
              <td id=${i}>${list_task[i]}</td>
              <td>${list_date[i]}</td>
              <td>  <input type=\"checkbox\" onclick = \"done(this)\"  id=${i}>     </td>
            </tr>
          ` 
          }
    }
    document.getElementById('list_task').innerHTML = tableList;
}

function done(that){
    
    
    if ( document.getElementById(that.id).style.textDecoration == "line-through" )
      {
           document.getElementById(that.id).style.textDecoration="";
      
        }
    else
      {
       document.getElementById(that.id).style.textDecoration="line-through";
     
     }
   
}
