const express = require('express');
const sql = require('mssql'); // Modulo per SQL Server
const cors = require('cors');  // Aggiungi il pacchetto cors
const app = express();
const port = 3000;

// Configurazione del database SQL Server
const config = {
    user: 'sa', // Nome utente
    password: 'Aebsistemi@.', // Password
    server: 'NB-MATTEO', // Nome del server SQL
    database: 'Score', // Nome del database
    options: {
        encrypt: true, // Per Azure, se necessario
        trustServerCertificate: true // Per evitare problemi di certificato
    }
};


// Abilita CORS per tutte le origini (o specifica una lista di domini)
app.use(cors());  // Aggiungi questa riga per abilitare CORS


// Definisci una route di base per la root "/"
app.get('/', (req, res) => {
  res.send('Benvenuto nel server Node.js!'); // Risposta alla richiesta GET per la root
});


// Middleware per il parsing del corpo JSON
app.use(express.json());


// Route per eseguire una query e restituire i risultati
app.get('/run-query', async (req, res) => {
    try {
        // Connessione al database
        await sql.connect(config);

        // Esegui una query SQL (ad esempio, recupera i punteggi)
        const result = await sql.query`SELECT * FROM Score`;  // Cambia "Punteggi" con il nome della tua tabella

        // Restituisci i risultati al client
        res.json(result.recordset);  // `recordset` contiene i risultati della query
    } catch (err) {
        console.error('Errore durante l\'esecuzione della query', err);
        res.status(500).send('Errore nel recuperare i dati');
    }
});


// Route per eseguire un UPDATE
app.post('/update-query', async (req, res) => {
    try {
        // Connessione al database
        await sql.connect(config);

        // Dati inviati dal client
        const { IdScore, ScoreHome, ScoreGuest } = req.body;  // Destruttura i dati inviati dal client

        // Verifica che tutti i dati necessari siano presenti
        if (!IdScore || ScoreHome === undefined || ScoreGuest === undefined) {
            return res.status(400).send('Dati incompleti per l\'aggiornamento');
        }

        // Esegui la query SQL per aggiornare i punteggi
        const result = await sql.query`UPDATE Score SET ScoreHome = ${ScoreHome}, ScoreGuest = ${ScoreGuest} WHERE IdScore = ${IdScore}`;

        // Verifica se il record è stato aggiornato
        if (result.rowsAffected[0] > 0) {
            // Se il numero di righe modificate è maggiore di 0, l'update è riuscito
            res.json({ success: true, message: 'Record aggiornato con successo' });
        } else {
            // Se non è stato aggiornato nessun record, potrebbe significare che l'id non esiste
            res.status(404).json({ success: false, message: 'Record non trovato' });
        }
    } catch (err) {
        console.error('Errore durante l\'aggiornamento della query', err);
        res.status(500).send('Errore nel server durante l\'aggiornamento');
    }
});



// Route per eseguire un DELETE
app.post('/delete-query', async (req, res) => {
    try {
        // Connessione al database
        await sql.connect(config);

        // Dati inviati dal client
        const { IdScore } = req.body;  // Destruttura i dati inviati dal client

        // Verifica che tutti i dati necessari siano presenti
        if (!IdScore || IdScore <= 0) {
            return res.status(400).send('Dati incompleti per l\'aggiornamento');
        }

        // Esegui la query SQL per aggiornare i punteggi
        const result = await sql.query`DELETE from Score WHERE IdScore = ${IdScore}`;

        // Verifica se il record è stato eliminato
        if (result.rowsAffected[0] > 0) {
            // Se il numero di righe modificate è maggiore di 0, la delete è riuscita
            res.json({ success: true, message: 'Record eliminato con successo' });
        } else {
            // Se non è stato eliminato nessun record, potrebbe significare che l'id non esiste
            res.status(404).json({ success: false, message: 'Record non trovato' });
        }
    } catch (err) {
        console.error('Errore durante l\'aggiornamento della query', err);
        res.status(500).send('Errore nel server durante l\'aggiornamento');
    }
});




// Avvia il server
app.listen(port, () => {
    console.log(`Server in ascolto su http://nb-matteo:${port}`);
});