const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database('./scoremonitor.db');

// Middleware
app.use(bodyParser.json());

// Crea la tabella per i punteggi
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS score (
      id INTEGER PRIMARY KEY,
      punteggio_home INTEGER DEFAULT 0,
      punteggio_guest INTEGER DEFAULT 0
    )
  `);

    // Inizializza i dati (se non esistono)
    db.run(`
    INSERT OR IGNORE INTO score (id, punteggio_home, punteggio_guest)
    VALUES (1, 0, 0, 0, 0)
  `);
});

// Endpoint per recuperare i dati
app.get('/score', (req, res) => {
    db.get('SELECT * FROM score WHERE id = 1', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Endpoint per aggiornare i punteggi
app.post('/score', (req, res) => {
    const { punteggioHome, punteggioGuest} = req.body;
    db.run(
        `UPDATE score SET punteggio_home = ?, punteggio_guest = ? WHERE id = 1`,
        [punteggioHome, punteggioGuest],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        }
    );
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
