const express = require('express');
const sql = require('mssql'); // Modulo per SQL Server
const cors = require('cors');  // Aggiungi il pacchetto cors
const app = express();
const port = 3000;

// Configurazione del database SQL Server
const config = {
    user: 'sa', // Nome utente
    password: 'Aebsistemi@.', // Password
    server: 'DESKTOP-P3HHPDE', // Nome del server SQL
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


// Route per eseguire un UPDATE con incremento di +1
app.post('/update-query', async (req, res) => {
    try {
        // Connessione al database
        await sql.connect(config);

        // Dati inviati dal client
        const { IdScore, team } = req.body;  // Destruttura i dati inviati dal client

        // Verifica che tutti i dati necessari siano presenti
        if (!IdScore || !team) {
            return res.status(400).send('Dati incompleti per l\'aggiornamento');
        }

        // Prepara la query in base al team specificato per l'incremento
        let updateQuery;

        if (team === 'home') {
            // Incrementa ScoreHome di 1
            updateQuery = `UPDATE Score SET ScoreHome = ScoreHome + 1 WHERE IdScore = ${IdScore}`;
        } else if (team === 'guest') {
            // Incrementa ScoreGuest di 1
            updateQuery = `UPDATE Score SET ScoreGuest = ScoreGuest + 1 WHERE IdScore = ${IdScore}`;
        } else {
            return res.status(400).send('Valore di team non valido');
        }

        // Esegui la query SQL per aggiornare i punteggi
        const result = await sql.query(updateQuery);

        // Verifica se il record è stato aggiornato
        if (result.rowsAffected[0] > 0) {
            // Se il numero di righe modificate è maggiore di 0, l'update è riuscito
            res.json({ success: true, message: 'Punteggio aggiornato con successo' });
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


// Route per ottenere il record con l'ID più grande
app.get('/latest-record', async (req, res) => {
    try {
        // Connessione al database
        await sql.connect(config);

        // Query per ottenere il record con l'ID più grande
        const result = await sql.query`SELECT TOP 1 * FROM Score ORDER BY IdScore DESC`;

        // Restituisci il record al client
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]); // Restituisci il primo (e unico) record
        } else {
            res.status(404).send('Nessun record trovato');
        }
    } catch (err) {
        console.error('Errore durante il recupero del record più recente', err);
        res.status(500).send('Errore nel server durante il recupero dei dati');
    }
});



// Avvia il server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server in ascolto su http://DESKTOP-P3HHPDE:${port}`);
});