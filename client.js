async function eseguiQuerySelect() {
    try {
        // Fai una richiesta GET al server per eseguire la query
        const response = await fetch('http://NB-MATTEO:3000/run-query');

        // Assicurati che la risposta sia corretta
        const data = await response.json();

        console.log(data); // Stampa il risultato per vedere la struttura

        // Verifica che i dati siano presenti
        if (data && data.length > 0) {
            // Accedi ai dati del primo record (se la query restituisce una lista di oggetti)
            const firstRecord = data[0];  // Supponiamo che tu voglia il primo record
            console.log(firstRecord); // Puoi vedere qui i valori di IdScore, ScoreGuest, e ScoreHome
            document.getElementById('ScoreHome').textContent = `${firstRecord.ScoreHome}`;
            document.getElementById('ScoreGuest').textContent = `${firstRecord.ScoreGuest}`;
        } else {
            document.getElementById('ScoreHome','ScoreGuest').textContent = 'Nessun dato disponibile';
        }

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}


async function eseguiQueryUpdate() {
    try {

        // I dati che desideri aggiornare
        const datiDaAggiornare = {
            ScoreHome: 10,  // Nuovo valore per ScoreHome
            ScoreGuest: 20,  // Nuovo valore per ScoreGuest
            IdScore: document.getElementById('IdScore').value // L'ID dell'elemento da aggiornare
        };


        // Fai una richiesta POST al server per eseguire l'aggiornamento
        const response = await fetch('http://NB-MATTEO:3000/update-query', {
            method: 'POST',  // Puoi usare anche PUT se il tuo server lo richiede
            headers: {
                'Content-Type': 'application/json',  // Specifica che i dati sono in formato JSON
            },
            body: JSON.stringify(datiDaAggiornare)  // Invia i dati in formato JSON
        });

        // Assicurati che la risposta sia corretta
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }

        // Ottieni la risposta JSON (ad esempio, un messaggio di successo o un numero di righe aggiornate)
        const data = await response.json();

        // Verifica la risposta
        console.log(data);
        if (data.success) {
            console.log('Aggiornamento riuscito!');
        } else {
            console.error('Errore durante l\'aggiornamento');
        }

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}


async function eseguiQueryDelete() {
    try {
        // I dati che desideri aggiornare
        const datiDaEliminare = {
            IdScore: document.getElementById('IdScore').value // L'ID dell'elemento da eliminare
        };

        // Fai una richiesta POST al server per eseguire l'aggiornamento
        const response = await fetch('http://NB-MATTEO:3000/delete-query', {
            method: 'POST',  // Puoi usare anche PUT se il tuo server lo richiede
            headers: {
                'Content-Type': 'application/json',  // Specifica che i dati sono in formato JSON
            },
            body: JSON.stringify(datiDaEliminare)  // Invia i dati in formato JSON
        });

        // Assicurati che la risposta sia corretta
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }

        // Ottieni la risposta JSON (ad esempio, un messaggio di successo o un numero di righe aggiornate)
        const data = await response.json();

        // Verifica la risposta
        console.log(data);
        if (data.success) {
            console.log('Aggiornamento riuscito!');
        } else {
            console.error('Errore durante l\'aggiornamento');
        }

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

