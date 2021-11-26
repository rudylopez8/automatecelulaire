// fonction qui dit a une celule combien de ces voisine sont vive
function info(nbligne, nbcolonne) {
    let result=0;
    if (tab1[nbligne][nbcolonne] == 1) {
        result=result-1
    } 

    for (let i = nbligne-1; i <= nbligne+1; i++) {
        for (let j = nbcolonne-1; j <= nbcolonne+1; j++) {
				if (tab1[i][j] == 1) {
					result=(result+1);
				} 
        }
    }
    return result;

}

// fonction qui gère et aplique les règle de l'otomate
function evolut() {
    for (let i = 0; i < NBLIGNE; i++) {
        for (let j = 0; j < NBCOLONNE; j++) {
			let voisin = info(i,j);
			
            if (tab1[i][j] == 1) {
				
                if (voisin==2 || voisin==3) {
                    tab2[i][j] == 1;
                } else {
                    tab2[i][j] == 0;
                }                
            } 
            else if (voisin==3) {
                tab2[i][j] == 1;
            }    
        }
    }
}
function remplace() {
tab1=tab2    
}

function rafrechie() {
    for (let i = 0; i < NBLIGNE; i++) {
        for (let j = 0; j < NBCOLONNE; j++) {
			let td=grille.rows[i].cells[j];
            if (tab2[i][j] == 1) {
                td.className = "vive";
                td.innerHTML = "V";
            } else {
                td.className = "morte";
                td.innerHTML = ".";                
            }     
        }
    }
}




let tab1=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
let tab2=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

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
            td.className = "";
            td.innerHTML = "";
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
const NBLIGNE = 16;
const NBCOLONNE = 16;
creerTableau(NBLIGNE, NBCOLONNE);
let grille = document.getElementById("grille");


/**
 * vrai si td vivente
 * @param {td} obj 
 */
 function isVive(obj) {
    return (obj.className == "vive");
}
/********** PROGRAMME PRINCIPAL ***********/
//creerTableau()

// evolution toutes les 500 millisecondes de la grille
let timer = setInterval(evolut, rafrechie(), remplace(),  500);