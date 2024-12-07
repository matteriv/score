// Funzione per eseguire l'update
async function eseguiQueryUpdate(team) {
    try {
        // Ottieni l'ID del record da aggiornare (assumendo che ci sia un campo input con l'ID "IdScore")
        const idScore = document.getElementById('IdScore').value;

        if (!idScore || isNaN(idScore) || idScore <= 0) {
            console.error("ID del punteggio non valido");
            return;
        }

        // Dati che desideri inviare al server
        const datiDaAggiornare = {
            IdScore: idScore,
            team: team  // 'home' o 'guest' a seconda del pulsante premuto
        };

        // Fai una richiesta POST al server per eseguire l'aggiornamento
        const response = await fetch('http://DESKTOP-P3HHPDE:3000/update-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Specifica che i dati sono in formato JSON
            },
            body: JSON.stringify(datiDaAggiornare)  // Invia i dati in formato JSON
        });

        // Assicurati che la risposta sia corretta
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }

        // Ottieni la risposta JSON
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

// Aggiungi gli event listener ai pulsanti
document.getElementById('ScorePlusHome').addEventListener('click', function () {
    eseguiQueryUpdate('home');  // Invia 'home' per incrementare ScoreHome
});

document.getElementById('ScorePlusGuest').addEventListener('click', function () {
    eseguiQueryUpdate('guest');  // Invia 'guest' per incrementare ScoreGuest
});