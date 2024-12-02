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
    aggiornaLabelFront();  // Per la pagina che ha la label con id="PunteggioFront"

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

    // Funzione per aggiornare la label con il punteggio frontend
    function aggiornaLabelFront() {
        const label = document.getElementById("PunteggioFront");
        if (label) {
            console.log("Aggiornando PunteggioFront (frontend)"); // Debugging
            label.textContent = punteggioHome;
        }
    }

    // Funzione per aggiornare il punteggio con +
    function aggiungiPuntoHome() {
        punteggioHome += 1;
        aggiornaLabelHomeBackend();
        aggiornaLabelFront();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per aggiornare il punteggio con +
    function aggiungiPuntoGuest() {
        punteggioGuest += 1;
        aggiornaLabelGuestBackend();
        //aggiornaLabelFront();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioGuest", punteggioGuest);
    }

    // Funzione per aggiornare il punteggio con -
    function sottraiPuntoHome() {
        if (punteggioHome > 0) {
            punteggioHome -= 1;
        }
        aggiornaLabelHomeBackend();
        aggiornaLabelFront();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per aggiornare il punteggio con -
    function sottraiPuntoGuest() {
        if (punteggioGuest > 0) {
            punteggioGuest -= 1;
        }
        aggiornaLabelGuestBackend();
        //aggiornaLabelFront();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggioGuest", punteggioGuest);
    }

    // Funzione per azzerare il punteggio
    function azzeraPuntoHome() {
        punteggioHome = 0;
        aggiornaLabelHomeBackend();
        aggiornaLabelFront();
        // Salvo il punteggio nel localStorage
        localStorage.setItem("punteggio", punteggioHome);
    }

    // Funzione per azzerare il punteggio
    function azzeraPuntoGuest() {
        punteggioGuest = 0;
        aggiornaLabelGuestBackend();
        //aggiornaLabelFront();
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
        //aggiornaLabelFront();
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
        console.log("Timer attivo, aggiornamento punteggio:", punteggioHome); // Debugging
        aggiornaLabelHomeBackend();
        aggiornaLabelFront();
    }, 1000);
};
