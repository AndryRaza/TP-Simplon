function page_charge(){
pseudo = prompt("Pseudo","Andry");
document.getElementById("pseudo_txt").innerText= pseudo;
}

pseudo= "Test";

etat_joueur=""; /*ce que joue le joueur (pierre,papier,ciseaux)*/
etat_ordi="";   /*ce que joue l'ordinateur (pierre,papier,ciseaux)*/
gagnant_nom="";
manche=0;  /* le numéro de la manche */
victoire_joueur=0; /* le nbre de victoire du joueur */
victoire_ia=0; /* le nbre de victoire de l'ordinateur */
etat_jeu=0; /* à 0 on peut jouer à 1 le jeu est fini */
btn_start=0; /* à 0 on ne peut pas cliquer sur les boutons à 1 on peut cliquer */ 

victoire_affile_joueur = 0;

localStorage.setItem('meilleur_score',50);
meilleur_score = sessionStorage.getItem("meilleur_score");


var audio = new Audio('son/audio.mp3'); /* clapements de victoire */

function button_pierre() /*Pour jouer pierre */
{
    if (etat_jeu==0 && btn_start==1)
    {
    
    document.getElementById("j1").style.backgroundImage="url('img/pierre.png')";
    etat_joueur="Pierre";
    btn_start=0;
    computer();
    jeu();
}
 }

 function button_papier() /* Pour jouer papier */
{
    if (etat_jeu==0 && btn_start==1){
    document.getElementById("j1").style.backgroundImage="url('img/feuille.png')";
    etat_joueur="Papier";
    btn_start=0;
    computer();
    jeu();
}
 }

 function button_ciseaux() /* Pour jouer ciseaux */
{
    if (etat_jeu==0 && btn_start==1){
    document.getElementById("j1").style.backgroundImage="url('img/ciseaux.png')";
    etat_joueur="Ciseaux";
    btn_start=0;
    computer();
    jeu();}
 }

 /* Je crée une fonction pour avoir un nombre random */
 function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

 /* Ce que l'ordinateur va jouer de façon aléatoire */
 function computer(){
    var chiffre=getRandomInt(3); 
    if (chiffre==0){
        document.getElementById("j2").style.backgroundImage="url('img/pierre.png')";
        etat_ordi="Pierre";
    }

    if (chiffre==1){
        document.getElementById("j2").style.backgroundImage="url('img/feuille.png')";
        etat_ordi="Papier";
    }

    if (chiffre==2){
        document.getElementById("j2").style.backgroundImage="url('img/ciseaux.png')";
        etat_ordi="Ciseaux";
    }
 }

 /* si le joueur gagne, son cadre s'allume */
 function gagnant_joueur(){
     document.getElementById("eclat_joueur").innerText= 
     "@keyframes bordure1{" +
       "0% {border:10px double white}" +
        "25% {border:10px double green}" + 
        "50% {border:10px double white}" + 
        "75% {border:10px double green}" + 
        "100% {border:10px double white}}";
 }

 /* si l'ordinateur gagne, son cadre s'allume */
 function gagnant_ia(){
    document.getElementById("eclat_ia").innerText= 
    "@keyframes bordure2{" +
      "0% {border:10px double white}" +
       "25% {border:10px double green}" + 
       "50% {border:10px double white}" + 
       "75% {border:10px double green}" + 
       "100% {border:10px double white}}";
}

/* Quand la partie se termine */
function win(){
    document.getElementById("back_win").innerText= 
    "@keyframes win{" +
      "0% {backgroundColor: Black}" +
       "25% {background: url('img/victoire.jpg')}" + 
       "50% {backgroundColor: Black}" + 
       "75% {background: url('img/victoire.jpg')" + 
       "100% {backgroundColor: Black}}";
       audio.load();
      audio.play(); 
}

/* Principe du jeu */
 function jeu(){
    if (etat_ordi == 'Pierre' && etat_joueur == 'Pierre' ||etat_ordi == 'Ciseaux' && etat_joueur == 'Ciseaux' || etat_ordi == 'Papier' && etat_joueur == 'Papier') {
        gagnant_ia();
        gagnant_joueur();
      } else if (etat_ordi== 'Pierre' && etat_joueur == 'Ciseaux' || etat_ordi == 'Ciseaux' && etat_joueur == 'Papier' || etat_ordi == 'Feuille' && etat_joueur == 'Pierre') {
        
        gagnant_ia();
        led_victoire_ia();
        
      } else {
        
        gagnant_joueur();
        led_victoire_joueur()
      }
 }

 /* Fonction pour allumer les leds du joueur */
 function led_victoire_joueur(){
    if (victoire_joueur == 0){
        document.getElementById("l11").style.backgroundColor="red";
    }
    if (victoire_joueur==1) {
        document.getElementById("l12").style.backgroundColor="red";
    }
    if (victoire_joueur==2){
        win();
        victoire_joueur=3;
        victoire_affile();
        document.getElementById("l13").style.backgroundColor="red";
    }
   
    victoire_joueur=victoire_joueur+1;
 }

 /* Fonction pour allumer les leds de l'ordinateur */
 function led_victoire_ia(){
    if (victoire_ia == 0){
        document.getElementById("l21").style.backgroundColor="red";
    }
    else if (victoire_ia==1) {
        document.getElementById("l22").style.backgroundColor="red";
    }
    if (victoire_ia==2){
        win();
        victoire_ia=3;

        victoire_affile();
        document.getElementById("l23").style.backgroundColor="red";
    }
    victoire_ia=victoire_ia+1;
 }
 /* Pour passer à la manche suivante et relancer le jeu */
 function manche_suivante(){
    document.getElementById("eclat_joueur").innerText= "";
    document.getElementById("eclat_ia").innerText= "";
    
    if (victoire_joueur < 3 && victoire_ia <3) {
        btn_start=1;
        manche=manche +1;
    }
    else {
       
        etat_jeu=1;
    }

    document.getElementById("compteur_txt").innerText= String(manche);
 }

function victoire_affile(){
    if(victoire_joueur==3)
    {victoire_affile_joueur++;}
    if (victoire_ia==3)
    {victoire_affile_joueur=0;}
    if (meilleur_score < victoire_affile_joueur){
        meilleur_score = victoire_affile_joueur; 
    }
    document.getElementById("victoire").innerText="Victoire(s) d'affilée(s) : "+ String(victoire_affile_joueur);
    document.getElementById("meilleur_score").innerText="Meilleur score : "+ String(meilleur_score);
}

 /* Pour remettre à zéro les leds et la manche */
function reset(){
    etat_joueur="";
    etat_ordi="";
    gagnant_nom="";
    manche=0;
    victoire_joueur=0;
    victoire_ia=0;
    etat_jeu=0;
    btn_start=0;
    document.getElementById("compteur_txt").innerText= String(manche);
    document.getElementById("eclat_joueur").innerText= "";
    document.getElementById("eclat_ia").innerText= "";
    document.getElementById("back_win").innerText="";
    document.getElementById("l11").style.backgroundColor="grey";
    document.getElementById("l12").style.backgroundColor="grey";
    document.getElementById("l13").style.backgroundColor="grey";
    document.getElementById("l21").style.backgroundColor="grey";
    document.getElementById("l22").style.backgroundColor="grey";
    document.getElementById("l23").style.backgroundColor="grey";
    document.getElementById("j1").style.backgroundColor="black";
    document.getElementById("j1").style.backgroundImage="";
    document.getElementById("j2").style.backgroundColor="black";
    document.getElementById("j2").style.backgroundImage="";
    audio.pause();
}

/* ---------------------------------------------- */
/* PARTIE DONNEES */

/* Je récupére ce qu'il y a dans mon fichier .json */
var request = new XMLHttpRequest();

/*
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
       var meilleur_score = response.score;
       console.log(meilleur_score);
    }
}



request.open("GET", 'donnee.json');
request.send();*/

/* Je vais envoyer des données dans mon fichier .json */
/*var request2 = new XMLHttpRequest();
request2.open("POST", 'donnee.json');
request2.setRequestHeader("Content-Type","application/json"); /*des informations sur les données envoyées */

/*tab_score =[(pseudo,meilleur_score)];
request2.send(JSON.stringify(pseudo , meilleur_score));*/

/* ----------------------------- */ 


