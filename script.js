window.onload = function () {
    // Recupero il punteggio dal localStorage (se presente), altrimenti imposto a 0
    let punteggioHome = parseInt(localStorage.getItem("punteggio")) || 0;
    let punteggioPrecedenteHome = punteggioHome;  // Inizializzo con il punteggio attuale Home
    let punteggioGuest = parseInt(localStorage.getItem("punteggioGuest")) || 0;
    let punteggioPrecedenteGuest = punteggioGuest;  // Inizializzo con il punteggio attuale Guest

    console.log("Punteggio iniziale caricato:", punteggioHome); // Debugging
    console.log("Punteggio iniziale caricato:", punteggioGuest); // Debugging

    // Subito dopo il caricamento della pagina, aggiorna la label
    aggiornaLabelHomeBackend();  // Per la pagina che ha la label con id="Punteggio"
    aggiornaLabelGuestBackend();  // Per la pagina che ha la label con id="Punteggio"
    aggiornaLabelHomeFrontend();  // Per la pagina che ha la label con id="PunteggioFront"
    aggiornaLabelGuestFrontend();  // Per la pagina che ha la label con id="PunteggioFront"


    // Verifica se la pagina ha i pulsanti, e se li ha, aggiungi gli event listener
    const AddScoreHome = document.getElementById("AddScoreHome");
    const SubtractScoreHome = document.getElementById("SubtractScoreHome");
    const ResetScoreHome = document.getElementById("ResetScoreHome");

    if (AddScoreHome) {
        AddScoreHome.addEventListener("click", aggiungiPuntoHome);
    }

    if (SubtractScoreHome) {
        SubtractScoreHome.addEventListener("click", sottraiPuntoHome);
    }

    if (ResetScoreHome) {
        ResetScoreHome.addEventListener("click", azzeraPuntoHome);
    }

    const AddScoreGuest = document.getElementById("AddScoreGuest");
    const SubtractScoreGuest = document.getElementById("SubtractScoreGuest");
    const ResetScoreGuest = document.getElementById("ResetScoreGuest");

    if (AddScoreGuest) {
        AddScoreGuest.addEventListener("click", aggiungiPuntoGuest);
    }

    if (SubtractScoreGuest) {
        SubtractScoreGuest.addEventListener("click", sottraiPuntoGuest);
    }

    if (ResetScoreGuest) {
        ResetScoreGuest.addEventListener("click", azzeraPuntoGuest);
    }

    const ResetScoreAll = document.getElementById("ResetScoreAll");

    if (ResetScoreAll) {
        ResetScoreAll.addEventListener("click", azzeraPuntoAll);
    }


    // Funzione per aggiornare la label con il punteggio Home backend
    function aggiornaLabelHomeBackend() {
        const label = document.getElementById("PunteggioHome");
        if (label) {
            console.log("Aggiornando Punteggio Home (backend)"); // Debugging
            label.textContent = punteggioHome;
        }
    }

    // Funzione per aggiornare la label con il punteggio Guest backend
    function aggiornaLabelGuestBackend() {
        const label = document.getElementById("PunteggioGuest");
        if (label) {
            console.log("Aggiornando Punteggio Guest (backend)"); // Debugging
            label.textContent = punteggioGuest;
        }
    }

    // Funzione per aggiornare la label Guest con il punteggio frontend
    function aggiornaLabelGuestFrontend() {
        const label = document.getElementById("PunteggioFrontHome");
        if (label) {
            console.log("Aggiornando PunteggioFrontHome (frontend)"); // Debugging
            label.textContent = punteggioHome;
        }
    }

    // Funzione per aggiornare la label Home con il punteggio frontend
    function aggiornaLabelHomeFrontend() {
        const label = document.getElementById("PunteggioFrontGuest");
        if (label) {
            console.log("Aggiornando PunteggioFrontGuest (frontend)"); // Debugging
            label.textContent = punteggioGuest;
        }
    }

    // Funzione per aggiornare il punteggio con +
    function aggiungiPuntoHome() {
        punteggioHome += 1;
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per aggiornare il punteggio con +
    function aggiungiPuntoGuest() {
        punteggioGuest += 1;
        aggiornaLabelGuestBackend();
        aggiornaLabelHomeFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioGuest", punteggioGuest);
    }

    // Funzione per aggiornare il punteggio con -
    function sottraiPuntoHome() {
        if (punteggioHome > 0) {
            punteggioHome -= 1;
        }
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per aggiornare il punteggio con -
    function sottraiPuntoGuest() {
        if (punteggioGuest > 0) {
            punteggioGuest -= 1;
        }
        aggiornaLabelGuestBackend();
        aggiornaLabelHomeFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioGuest", punteggioGuest);
    }

    // Funzione per azzerare il punteggio
    function azzeraPuntoHome() {
        punteggioHome = 0;
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per azzerare il punteggio
    function azzeraPuntoGuest() {
        punteggioGuest = 0;
        aggiornaLabelGuestBackend();
        aggiornaLabelHomeFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioGuest", punteggioGuest);
    }

    // Funzione per azzerare il punteggio generale
    function azzeraPuntoAll() {
        punteggioHome = 0;
        punteggioGuest = 0;
        punteggioPrecedenteHome = 0;
        punteggioPrecedenteGuest = 0;
        localStorage.setItem("punteggio", punteggioHome);
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestBackend();
        aggiornaLabelGuestFrontend();
        aggiornaLabelGuestFrontend();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioHome", punteggioHome);
        localStorage.setItem("punteggioGuest", punteggioGuest);
        localStorage.setItem("punteggioPrecedenteHome", punteggioPrecedenteHome);
        localStorage.setItem("punteggioPrecedenteGuest", punteggioPrecedenteGuest);
    }

    // Avvio il timer per controllare ogni secondo
    setInterval(() => {
        // Recupera il punteggio ogni volta dal localStorage e aggiorna le label
        punteggioHome = parseInt(localStorage.getItem("punteggio")) || 0;
        punteggioGuest = parseInt(localStorage.getItem("punteggioGuest")) || 0;
        console.log("Timer attivo, aggiornamento punteggio:", punteggioHome); // Debugging
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestFrontend();
        aggiornaLabelGuestBackend();
        aggiornaLabelHomeFrontend();
    }, 1000);



    //////////////////////////////////////////////////////
    //  Gestione dei dati su Sb SqLite
    /////////////////////////////////////////////////////



    // Funzione per aggiornare i dati sul server
    async function aggiornaDatabase() {
        await fetch('http://localhost:3000/punteggi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ punteggioHome, punteggioGuest, secondi, minuti }),
        });
    }

    // Adatta le funzioni per salvare i punteggi su SQLite
    function aggiungiPuntoHome() {
        punteggioHome += 1;
        aggiornaLabelHomeBackend();
        aggiornaLabelGuestFrontend();
        aggiornaDatabase(); // Salva su SQLite
    }

    function aggiungiPuntoGuest() {
        punteggioGuest += 1;
        aggiornaLabelGuestBackend();
        aggiornaLabelHomeFrontend();
        aggiornaDatabase(); // Salva su SQLite
    }







    //////////////////////////////////////////////////////
    //  Gestione dei timer
    /////////////////////////////////////////////////////


    // Variabili per i minuti e i secondi
    let minuti = 0;
    let secondi = 0;

    // Funzione per aggiornare il contatore
    function updateCounter() {


     // Incrementa i secondi

        secondi++;

        // Salvo i secondi nel localStorage
        localStorage.setItem("secondi", secondi);
        console.log("Secondi: ", secondi); // Debugging


     // Se i secondi raggiungono 60, incrementa i minuti e resetta i secondi
        if (secondi === 60) {
            secondi = 0;
            minuti++;
        }

     // Formatta i minuti e i secondi con due cifre
        let formattedMinutes = minuti < 10 ? "0" + minuti : minuti;
        let formattedSeconds = secondi < 10 ? "0" + secondi : secondi;

     // Mostra il contatore nella pagina
        document.getElementById("timer").textContent = `${formattedMinutes}:${formattedSeconds}`;

    }

    // Avvia il contatore ogni secondo
    setInterval(updateCounter, 1000);

};
