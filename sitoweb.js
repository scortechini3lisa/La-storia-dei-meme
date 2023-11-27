//dichiarazione classe meme
class memeClasse {
    constructor(nome, descrizione, immagini) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.immagini = immagini;
    }
}

//dichiarazione classe immagine
class image {
    constructor(percorso, grandezza, altezza) {
        this.percorso = percorso;
        this.grandezza = grandezza;
        this.altezza = altezza;
    }
}

// Percorso del file
var percorsoFile = 'listaMeme.txt';
// Variabili per il salvataggio dei meme
var listaMeme;
var allMeme = [];
var allImmages = [];
var specifiche;
var appoggio;
var immagineAppoggio;
var nImmagini; //numero di immagini per il singolo meme
var listaImmagini; //array delle immagini
var conta;
// Utilizzo di fetch per ottenere i dati dal file
fetch(percorsoFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel recupero dei dati');
        }
        return response.text();
    })
    .then(dati => {
        // Caricamento dei dati
        listaMeme = dati.split(';');
        for (var i = 0; i < listaMeme.length; i++) {
            conta = 0;
            // Salvataggio dei singoli meme
            specifiche = listaMeme[i].split('-');
            // Definiamo il numero di immagini che vogliamo creare
            nImmagini = specifiche[2];
            // Salvataggio delle immagini
            for(var c=0;c<nImmagini;c++) {
                conta = conta+3;
                //la prima volta che salvi le immagini svuoti l'array allImmages
                if(c == 0) {
                    allImmages = [];
                }
                immagineAppoggio = new image(specifiche[conta],specifiche[conta+1],specifiche[conta+2]);
                allImmages.push(immagineAppoggio);
            }
            // Salvataggio delle specifiche di ogni meme
            appoggio = new memeClasse(specifiche[0], specifiche[1], allImmages);
            // Inserimento del meme nella lista di tutti i meme
            allMeme.push(appoggio);
            //linkImmagine = allMeme[i].immagine;
            // document.getElementById('memeNome').innerHTML = allMeme[i].nome;
            // document.getElementById('memeDescrizione').innerHTML = allMeme[i].descrizione;
            // document.getElementById('memeImmagine').src = allMeme[i].immagine;
        }
            // Otteniamo il riferimento all'elemento contenitore
			var container = document.getElementById('container');
			// Definiamo il numero di div che vogliamo creare
			var numeroDiv = allMeme.length - 1;

			// Ciclo per creare e aggiungere i div al contenitore
			for (var i = 0; i < numeroDiv; i++) {
				// Creiamo un nuovo elemento div
				var nuovoDiv = document.createElement('div');

				// Creazione dell'oggetto titolo
				var nuovoTitolo = document.createElement('h1');
				nuovoTitolo.textContent = allMeme[i].nome;
				nuovoDiv.appendChild(nuovoTitolo);

				// Creazione dell'oggetto paragrafo
				var nuovoParagrafo = document.createElement('p');
				nuovoParagrafo.textContent = allMeme[i].descrizione;
				nuovoDiv.appendChild(nuovoParagrafo);

                var nuovoDivImmagini = document.createElement('div');
                nuovoDiv.appendChild(nuovoDivImmagini);
                
                // Definiamo il numero di immagini che vogliamo creare
                nImmagini = allMeme[i].immagini.length;

                // Ciclo per la creazione degli oggetti immagine
                for (var c=0;c<nImmagini;c++) {
                    // Creazione degli oggetto immagine
                    var nuovaImmagine = document.createElement('img');
                    nuovaImmagine.src = allMeme[i].immagini[c].percorso;
                    nuovaImmagine.width = allMeme[i].immagini[c].grandezza;
                    nuovaImmagine.height = allMeme[i].immagini[c].altezza;
                    nuovoDiv.appendChild(nuovaImmagine);   
                    nuovaImmagine.classList.add('immagine');
                }

				// Aggiunge l'elemento div al contenitore
				container.appendChild(nuovoDiv);
                // Assegna le classi agli oggetti
                nuovoDivImmagini.classList.add('contenitoreImmagini');
                nuovoDiv.classList.add('paragrafo');
			}
           
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM caricato");
        }
		);
    })
    .catch(error => {
        console.error('Errore durante il recupero dei dati:', error);
    });
    