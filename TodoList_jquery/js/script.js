/* -------------Fonctions---------------*/
var list_urg = [];
var list_task = [];
var list_date = [];


/* Récupérer la tâche sa date son statut dans des listes */
function recup() {
    //Mettre le statut d'urgence de la tâche dans la liste d'urgence - Si c'est urgent on rajoute true sinon false"

    if (($("input:checkbox[name=urgent]").is(":checked")==false) && ($("input:checkbox[name=normal]").is(':checked'))==false) {  // Si les 2 checkbox sont cochées 
        alert('Vous devez cocher une option');
    }
    else if (($("input:checkbox[name=urgent]").is(":checked")) || ($("input:checkbox[name=normal]").is(':checked'))) {

        if ($("input:checkbox[name=urgent]").is(":checked")) {
            list_urg.push("urgent");
        }
        if ($("input:checkbox[name=normal]").is(':checked')) {
            list_urg.push("normal");
        }

        //Mettre la tâche dans la liste des tâches

        list_task.push($("input[name='name_task']").val());  //Récupérer la valeur dans l'input

        //Mettre la date dans la liste des dates
        var date = new Date();
        var mois = date.getMonth() + 1;
        var jour = date.getDate();
        var annee = date.getFullYear();
        var date_txt = jour + "/" + mois + "/" + annee;
        list_date.push(date_txt);

        //Appeler la fonction show() qui prend en paramètre les 3 listes pour les afficher 
        show(list_urg, list_task, list_date);
        list_maj(list_task);
        reset();
    }
    
}

//Pour afficher les 3 listes 
function show(l1, l2, l3) {
    let tableList = "";
    for (i = first; i < first + numberOfItems; i++) {
       if (i < list_task.length){
        tableList += `
            <tr> 
            <td id=${l1[i]}></td>
            <td id=${i}>${l2[i]}</td>
            <td>${l3[i]}</td>
            </tr>
          `;}
            
    };
    $('#list_task').html(tableList);
}

//On va rajouter la tâche dans notre liste déroulante
function list_maj(l2) {
    txt = "";
    for (i = 0; i <= l2.length - 1; i++) {
        txt += ` <option value=${i}> ${l2[i]} </option> `
    };
    $('#task_deroulant').html(txt);

    $('#task_deroulant option:selected').val()
}

function maj() {
    i = $('#task_deroulant option:selected').val();
    row = $('#' +i);    //On récupére l'id de la case qui contient notre tâche pour pouvoir la barrer quand elle sera finie
    
    if ($("input:checkbox[name=urgent_maj]").is(":checked")) {
        list_urg[i] = "urgent";
        show(list_urg,list_task,list_date);  //On modifie le statut à urgent et on réactulise la liste 
    }
    if ($("input:checkbox[name=normal_maj]").is(':checked')) {
        list_urg[i] = "normal";
        show(list_urg,list_task,list_date); //On modifie le statut à normal et on réactulise la liste
    }

    if ($("input:checkbox[name=done]").is(':checked')) {
        row.css( 'text-decoration','line-through') // La tâche est finie, on peut la barrer
    }
    reset();
}

function decoche_normal(){
    $("input:checkbox[name=normal]").prop('checked', false);
}

function decoche_urgent(){
    $("input:checkbox[name=urgent]").prop('checked', false);
}
function decoche_normal_maj(){
    $("input:checkbox[name=normal_maj]").prop('checked', false);
}

function decoche_urgent_maj(){
    $("input:checkbox[name=urgent_maj]").prop('checked', false);
}

/* ---------- Partie Pagination ----------  */ 

var first = 0; //première ligne (tâche + date + son icône)
var actualPage = 1; //on commence à la 1ère page logique !

var numberOfItems = 5; //nbre de lignes qu'on affiche

function firstPage(){
    first=0;
    actualPage = 1;
    $('#pageInfo').html(actualPage); 
    show(list_urg, list_task, list_date);
}

function previousPage(){
    if ( first - numberOfItems >= 0)
    {
     first -= numberOfItems;
     actualPage--;
     $('#pageInfo').html(actualPage); 
     show(list_urg, list_task, list_date);
     }
}


function nextPage(){
    if ( first + numberOfItems < list_task.length)
   { first += numberOfItems;
    actualPage++;
    $('#pageInfo').html(actualPage); 
    show(list_urg, list_task, list_date);
    }
}

function lastPage(){
    if (list_task.length != 0)
   { var maxPages = Math.ceil(list_task.length / numberOfItems);
    first = (maxPages * numberOfItems) - numberOfItems;
    actualPage = maxPages;
    $('#pageInfo').html(actualPage); 
    show(list_urg, list_task, list_date);
   }
}

/* -------------Appels des fonctions---------------*/
$("button[name='btn_add']").click(recup);//Quand je clique sur le bouton "ajouter", ca va ajouter la tâche à la liste
$("button[name='btn_maj']").click(maj); //Quand je clique sur le bouton "maj", ca va mettre à jour ma liste

//On va faire en sorte qu'on ne puisse cocher qu'une checkbox
$("input:checkbox[name=urgent]").click(decoche_normal);
$("input:checkbox[name=normal]").click(decoche_urgent);
$("input:checkbox[name=normal_maj]").click(decoche_urgent_maj);
$("input:checkbox[name=urgent_maj]").click(decoche_normal_maj);

//boutons de pagination 
$("button[name='btn_firstpage']").click(firstPage);
$("button[name='btn_previous']").click(previousPage);
$("button[name='btn_next']").click(nextPage);
$("button[name='btn_lastpage']").click(lastPage);

//On va illuminer les inputs

$('input').hover(function(){
    $(this).css('background-color','yellow');
}, function(){
    $(this).css('background-color','white');
})

/* -------------Reset---------------*/
function reset() {
    $("input[name='name_task']").val("Entrez la tâche");    //On remet le input à sa phase initiale
    $("input:checkbox").prop('checked', false);             //On décoche toutes les checkboxs
}

