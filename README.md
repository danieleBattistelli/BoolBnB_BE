### BoolBnB
è una web app che permette di cercare immobili in affitto
I proprietari di immobili, possono inserire le informazioni delle loro proprietà per essere contattati.
Gli utenti interessati ad affittare, possono cercare e visualizzare gli immobili. Una volta scelto l’immobile di interesse, possono contattare il proprietario tramite un form.
Gli utenti che hanno invece già affittato un immobile, potranno lasciare una recensione e schiacciare un cuoricino per esprimere gradimento per l’immobile.
Il cuoricino può essere schiacciato quante volte si vuole per esprimere più o meno gradimento.

Tipi di Utenti
Definiamo i seguenti tipi di utente che possono utilizzare BoolBnB:
● Utente proprietario (UP): un utente che inserisce un immobile da affittare.
● Utente interessato (UI): un qualsiasi utente del sito, non proprietario di immobile
Lista delle pagine
● Homepage: Offre la possibilità di visualizzare gli immobili. Di default, gli immobili saranno visualizzati in ordine decrescente per numero di cuoricini. E’ possibile cliccare i cuoricini di gradimento sulla card di ogni singolo immobile.
● Pagina di Ricerca Avanzata: permette di visualizzare i risultati di ricerca, ogni risultato permetterà l’accesso alla pagina di dettaglio dell’immobile. Inoltre è possibile raffinare la ricerca senza il refresh della pagina, applicando dei filtri. E’ possibile cliccare i cuoricini di gradimento sulla card di un immobile.
● Pagina Dettaglio immobile: permette di visualizzare tutti i dettagli disponibili per un immobile, comprese le recensioni e permette l’invio di un’e-mail al proprietario. Permette anche di aggiungere cuoricini e di lasciare nuove recensioni.
● Pagina di inserimento immobili Permette l’inserimento di un nuovo immobile.

Requisiti Tecnici

(RT1) Client-side Validation
Tutti gli input inseriti dall’utente sono controllati client-side (oltre che server-side) per un controllo di veridicità (es. il numero di stanze di un immobile deve essere positivo).
(RT2) Il sito è responsive
Il sito è correttamente visibile da desktop e da smartphone.
(RT3) La ricerca degli immobili nella pagina dedicata e l’applicazione dei filtri avvengono senza il refresh della pagina.

Requisiti Funzionali
La piattaforma soddisfa i seguenti requisiti funzionali (RF) che vengono dettagliati nelle pagine successive:
● (RF1) Permettere ai proprietari di immobile di aggiungere un immobile alla piattaforma
● (RF2) Permette ai visitatori di ricercare una immobile
● (RF3) Permettere ai visitatori di vedere i dettagli di un immobile
● (RF4) Permettere ai visitatori di scrivere al proprietario di un immobile per chiedere informazioni
● (RF5) Permettere ai visitatori di lasciare una recensione di un immobile
● (RF6) Permettere ai visitatori di lasciare dei cuoricini

(RF1) Permettere ai proprietari di immobile di aggiungere un immobile alla piattaforma
Visibilità: UP
Descrizione: Un proprietario registrato ha la possibilità di inserire uno o più immobili all’interno del sistema.
Per inserire un nuovo immobile il proprietario deve inserire le seguenti informazioni:
● Titolo riepilogativo che descriva l’immobile*
● Numero di stanze*
● Numero di letti*
● Numero di bagni*
● Metri quadrati*
● Indirizzo completo*
● Email di riferimento*
● Immagine rappresentativa dell’immobile
● La tipologia di immobile (Appartamento, Casa indipendente, Villa, Villetta a schiera, Chalet, Baita, ecc)
*Sono indicati con asterisco i campi obbligatori
È possibile modificare le informazioni inserite I form devono rispettare RT1.
Risultato: Una stanza è inserita nel sistema e le sue informazioni sono aggiornate

(RF2) Permettere ai visitatori di ricercare un immobile
Visibilità: UI / UP
Descrizione: Un qualsiasi utente è in grado di ricercare un immobile all’interno del database.
Inserendo una città o un indirizzo (anche parziale), il sistema ricerca all’interno del database gli immobili corrispondenti.
Inoltre, è possibile raffinare ulteriormente la ricerca impostando uno o più dei seguenti filtri:
● Numero minimo di stanze
● Numero minimo di posti letto
● La tipologia di immobile
I risultati vengono ordinati per gradimento (numero di cuoricini)
Nei risultati devono essere visibili, quantomeno:
numero stanze, numero bagni, indirizzo, metri quadrati, numero cuoricini, numero di recensioni.
Risultato: Viene generata una lista di immobili che corrispondono alla ricerca che mostra alcuni dettagli della stanza.

(RF3) Permettere ai visitatori di vedere i dettagli di un immobile
Visibilità: UI / UP
Descrizione: Selezionando un immobile in homepage o dai risultati di ricerca, appaiono tutti i dettagli disponibili riguardanti l’immobile in questione.
E’ anche disponibile la lista delle recensioni ed un box per lasciare la recensione.
Risultato: Viene visualizzata la pagina di dettaglio di un immobile

(RF4) Permettere ai visitatori di scrivere al proprietario di un immobile per chiedere informazioni
Visibilità: UI /UP
Descrizione: Dalla pagina di dettaglio dell’immobile deve essere possibile inviare un messaggio al proprietario dell’immobile.
L’utente deve inserire la propria email e un messaggio.
Risultato: Il messaggio viene inviato via mail all’indirizzo del proprietario

(RF5) Permettere ai visitatori di lasciare una recensione di un immobile
Visibilità: UI / UP
Descrizione: Dalla pagina di dettaglio dell’immobile deve essere possibile lasciare la recensione di un immobile.
L’utente deve inserire il proprio nome ed un testo descrittivo, oltre alla data e al numero di giorni di permanenza
Risultato: La recensione verrà successivamente mostrata nella pagina di dettaglio.

DATABASE:

CREATE DATABASE BoolBnB;

USE BoolBnB;

CREATE TABLE Proprietari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE Immobili (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proprietario_id INT,
    indirizzo VARCHAR(200),
    citta VARCHAR(100),
    descrizione TEXT,
    prezzo DECIMAL(10,2),
    FOREIGN KEY (proprietario_id) REFERENCES Proprietari(id)
);

CREATE TABLE Utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE Recensioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utente_id INT,
    immobile_id INT,
    recensione TEXT,
    data DATE,
    FOREIGN KEY (utente_id) REFERENCES Utenti(id),
    FOREIGN KEY (immobile_id) REFERENCES Immobili(id)
);

CREATE TABLE Cuoricini (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utente_id INT,
    immobile_id INT,
    valore INT, -- valore positivo o negativo per indicare più o meno gradimento
    data DATE,
    FOREIGN KEY (utente_id) REFERENCES Utenti(id),
    FOREIGN KEY (immobile_id) REFERENCES Immobili(id)
);

Proprietari: contiene le informazioni dei proprietari degli immobili.

Immobili: contiene le informazioni degli immobili disponibili per l'affitto.

Utenti: contiene le informazioni degli utenti che utilizzano la piattaforma.

Recensioni: contiene le recensioni lasciate dagli utenti sugli immobili.

Cuoricini: tiene traccia dei cuoricini espressi dagli utenti sugli immobili.