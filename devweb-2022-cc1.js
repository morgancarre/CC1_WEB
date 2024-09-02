"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  const maxValue = parseInt($maxUsr.value, 10);
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log(maxValue)) + 1;
  nbGuesses = 0;

  
  $output.innerHTML += `Partie lancée, trouvez le nombre secret en au plus ${maxGuesses} coups.<br>`;

  
  $guessBtn.disabled = false;
  $numUsr.value = ''; 
}

//ajout handler sur le bouton "lancer le jeu"
$startBtn.addEventListener("click", launchGame);

/* fonction qui vérifie d'abord si le nombre de tentative max n'est pas dépassées, puis qui 
vérifie le nombre de l'utilisateur avec le nombre secret et informe l'utilisateur en coséquence*/
function verifyGuess() {
  
  if (nbGuesses < maxGuesses-1){
    if (parseInt($numUsr.value) === secretNumber) {
      nbGuesses++; 
      $output.innerHTML += `Bravo, vous avez trouvé en ${nbGuesses} coups !<br>`;
      $guessBtn.disabled = true;
    } else if (parseInt($numUsr.value) > secretNumber) {
      nbGuesses++;
      $output.innerHTML += `${$numUsr.value} est trop haut.<br>`;
    } else {
      nbGuesses++;
      $output.innerHTML += `${$numUsr.value} est trop bas.<br>`;
    }
  }
  else if (parseInt($numUsr.value) === secretNumber) {
    nbGuesses++; 
    $output.innerHTML += `Bravo, vous avez trouvé en ${nbGuesses} coups !<br>`;
    $guessBtn.disabled = true;
  }
  else{
    $output.innerHTML += ` Perdu... le nombre était ${secretNumber}.<br>`;
    $guessBtn.disabled = true;
  }
  
}

//ajout du handler sur le bouton "Vérifier"
$guessBtn.addEventListener("click", verifyGuess);

//ajout du handler sur la touche Entrée
$numUsr.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    verifyGuess();
  }
});




function addCow(evt) {
  console.debug(evt.x, evt.y);
  // TODO : compléter ici

  //Création de l'objet img avec comme source l'image de la vache.
  const cowImg = document.createElement("img");
  cowImg.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  cowImg.classList.add("cow");

  //Position de la vache en fonction de la position de la souris sur la page
  cowImg.style.left = `${evt.pageX-22}px`;
  cowImg.style.top = `${evt.pageY-22}px`;

  //Rotation aléatoire de la vache 
  const rotation = Math.random() * 360;
  cowImg.style.transform = `rotate(${rotation}deg)`;

  document.body.appendChild(cowImg);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}

//ajout du handler sur le bouton "Vacher/Dévacher"
$cowBtn.addEventListener("click", toggleCow);



//CARRE MORGAN