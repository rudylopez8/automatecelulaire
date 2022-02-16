

//dimension de la grille
let NBLIGNE = 32;
let NBCOLONNE = 32;
let NBMS = 1000;
function changenb() {
    NBLIGNE = inputNbLigne.value;
    NBCOLONNE = inputNbColone.value;
}
function changeTemps() {
    NBMS = inputresolutionTemps.value;
}
//retourne un entier aléatoirte entre min (inclus) et max (inclus)
function mt_rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//tableaux de lancement
let tab1 = [];
let tab2 = [];

function lanceTab() {
    for (let i = 0; i < NBLIGNE; i++) {
        tab1[i] = [];
        for (let j = 0; j < NBCOLONNE; j++) {
            let alea = mt_rand(0, 5);
            if ((alea == 0) || (alea == 1)) {
                tab1[i][j] = 0;
            }
            else {
                tab1[i][j] = 1;
            }
        }
    }

    for (let i = 0; i < NBLIGNE; i++) {
        tab2[i] = [];
        for (let j = 0; j < NBCOLONNE; j++) {
            tab2[i][j] = 0;
        }
    }
}
// fonction qui dit a une celule combien de ces voisine sont vive
function info(nbligne, nbcolonne) {
    let result = 0;
    if (tab1[nbligne][nbcolonne] == 1) {
        result = result - 1
    }

    for (let i = nbligne - 1; i <= nbligne + 1; i++) {
        for (let j = nbcolonne - 1; j <= nbcolonne + 1; j++) {
            if (tab1[i] && tab1[i][j] && tab1[i][j] == 1) {
                result = (result + 1);
            }
        }
    }
    return result;

}

// fonction qui gère et aplique les règle de l'otomate
function evolut() {
    for (let i = 0; i < NBLIGNE; i++) {
        for (let j = 0; j < NBCOLONNE; j++) {
            let voisin = info(i, j);

            if (tab1[i][j] == 1) {

                if (voisin == 2 || voisin == 3) {
                    tab2[i][j] = 1;
                } else {
                    tab2[i][j] = 0;
                }
            }
            else if (voisin == 3) {
                tab2[i][j] = 1;
            }
        }
    }
}
function remplace() {
    for (let i = 0; i < NBLIGNE; i++) {
        for (let j = 0; j < NBCOLONNE; j++) {
            tab1[i][j] = tab2[i][j];
        }
    }
}

function rafrechie() {
    resultat.innerHTML = "";
    for (let i = 0; i < NBLIGNE; i++) {
        for (let j = 0; j < NBCOLONNE; j++) {
            if (tab2[i][j] == 1) {
                resultat.innerHTML += "V";
            } else {
                resultat.innerHTML += ".";
            }
        }
        resultat.innerHTML += "<br>";
    }
}





//le body
let body = document.querySelector("body");

//synthese vocale
let synth = window.speechSynthesis;

//lecteur audio
let audio = document.createElement("audio");
//audio.controls=true;
body.appendChild(audio);



/**
 * vrai si td vivente
 * @param {td} obj 
 */
function isVive(obj) {
    return (obj.className == "vive");
}
function boucle() {
    evolut();
    rafrechie();
    remplace();
}
function pause() {
    clearInterval(timer1);
}
function restart() {
    clearInterval(timer1);
    timer1 = setInterval(boucle, NBMS);
}
function start() {
    lanceTab();
    timer1 = setInterval(boucle, NBMS);
}

/********** PROGRAMME PRINCIPAL ***********/

// evolution toutes les 500 millisecondes de la grille
