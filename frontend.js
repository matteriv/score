// Funzione per aggiornare i dati dalla nuova route del server
async function aggiornaUltimoRecord() {
    try {
        // Effettua la richiesta GET al server
        const response = await fetch('http://DESKTOP-P3HHPDE:3000/latest-record');

        if (!response.ok) {
            throw new Error('Errore nel recupero del record più recente');
        }

        const data = await response.json();

        // Aggiorna i valori nella pagina
        document.getElementById('ScoreHome').textContent = `${data.ScoreHome}`;
        document.getElementById('ScoreGuest').textContent = `${data.ScoreGuest}`;
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati:', error);
    }
}

// Aggiorna i dati ogni 1 secondo
setInterval(aggiornaUltimoRecord, 1000);

// Carica i dati al primo avvio
aggiornaUltimoRecord();
