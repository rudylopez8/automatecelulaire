function info(nbligne, nbcolonne) {
    let result=(0);
    if (grille.rows[i].cells[j].className = "vive") {
        let result=(result-1);
    } 

    for (let i = nbligne-1; i < nbligne+1; i++) {
        for (let j = nbcolonne-1; j < nbcolonne+1; j++) {
            if (grille.rows[i].cells[j].className = "vive") {
                let result=(result+1);
            } 
        }
    }
    return result;

}


function evolut(nbligne, nbcolonne) {
    for (let i = 0; i < nbligne; i++) {
        for (let j = 0; j < nbcolonne; j++) {
            if (grille.rows[i].cells[j].className = "vive") {
                if (info(i,j)=2) {
                    td.className = "vive";
                    td.innerHTML = "<span class='sr-only'>vive</span>";
                }    
                if (info(i,j)=3) {
                    td.className = "vive";
                    td.innerHTML = "<span class='sr-only'>vive</span>";
                }    
                else {
                        td.className = "morte";
                        td.innerHTML = "<span class='sr-only'>morte</span>";    
                }                
            } 
            if (info(i,j)=3) {
                td.className = "vive";
                td.innerHTML = "<span class='sr-only'>vive</span>";
            }    

        }
    }
}

function creerTableau(nbligne, nbcolonne) {
    let body = document.querySelector("body");
    let table = document.createElement("table");
    table.id = "grille";
    body.appendChild(table);
    for (let i = 0; i < nbligne; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < nbcolonne; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            if (Math.random() < 0.2) {
                td.className = "vive";
                td.innerHTML = "<span class='sr-only'>vive</span>";
            }
            else {
                td.className = "morte";
                td.innerHTML = "<span class='sr-only'>morte</span>";
            }
        }
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

//dimension de la grille
const NBLIGNE = 64;
const NBCOLONNE = 64;
creerTableau(NBLIGNE, NBCOLONNE);
let grille = document.getElementById("grille");


function distance() {
    let ligneresulta = loup.dataset.ligne - perso.dataset.ligne;
    let colonneresulta = loup.dataset.colonne - perso.dataset.colonne;
    if (ligneresulta < 0)
        ligneresulta = "haut";
    else if (ligneresulta > 0)
        ligneresulta = "bas";
    else
        ligneresulta = "même ligne";

    if (colonneresulta < 0)
        colonneresulta = "gauche";
    else if (colonneresulta > 0)
        colonneresulta = "droite";
    else
        colonneresulta = "même colonne";

    let resultat = ligneresulta + " " + colonneresulta;
    return resultat;
} 
// naitre 3cel vive reste 2/3 cel viv
/**
 * vrai si td vivente
 * @param {td} obj 
 */
 function isVive(obj) {
    return (obj.className == "vive");
}
/********** PROGRAMME PRINCIPAL ***********/
// evolution toutes les 500 millisecondes de la grille
let timer = setInterval(evolut, 500);