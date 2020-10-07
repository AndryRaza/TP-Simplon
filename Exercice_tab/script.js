var tab1= [1,20,6,4,8,9,5]
var tab2= [4,12,36,2,8,7,3]

function afficher(l){
    txt= ""
    for(i=0;i <= l.length -1 ; i++){
        txt += "<td>"+ l[i] + "</td>"
    }
    return txt
}

function total(l1,l2){
    tab = []
    for(i=0;i <= l1.length -1 ; i++){
        tab[i] = l1[i] + l2[i]
    }
    return tab
}

$('body').ready(function(){
$('#tab1').html(afficher(tab1));
$('#tab2').html(afficher(tab2));
$('#tabtotal').html(afficher(total(tab1,tab2)))
}
)

