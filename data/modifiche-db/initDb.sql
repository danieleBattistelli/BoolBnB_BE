
CREATE TABLE Utenti (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
cognome VARCHAR(200),
email VARCHAR(200),
telefono VARCHAR(200),
username VARCHAR(200),
e_proprietario BOOL
);


CREATE TABLE Immobili (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_utente_proprietario BIGINT,
    prezzo_affitto DECIMAL,
    titolo_descrittivo VARCHAR(200),
    indirizzo VARCHAR(200),
    imgs VARCHAR(200),
    mq MEDIUMINT,
    citta VARCHAR(100),
    bagni INT,
    locali INT,
    posti_letto INT,
    descrizione TEXT,
    FOREIGN KEY (id_utente_proprietario) REFERENCES utenti(id)
);


CREATE TABLE Servizi (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome_servizio VARCHAR(200)
);

CREATE TABLE Immobili_Servizi (
id_immobile BIGINT,
id_servizio BIGINT, 
FOREIGN KEY (id_immobile) REFERENCES Immobili(id),
FOREIGN KEY (id_servizio) REFERENCES Servizi(id)
);

CREATE TABLE Tipi_Alloggio (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
nome_tipo_alloggio VARCHAR(200)
);

CREATE TABLE Immobili_Tipi_Alloggio (
id_immobile BIGINT,
id_tipo_alloggio BIGINT, 
FOREIGN KEY (id_immobile) REFERENCES Immobili(id),
FOREIGN KEY (id_tipo_alloggio) REFERENCES Tipi_Alloggio(id)
);

CREATE TABLE Recensioni (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
id_immobile BIGINT,
id_utente BIGINT, 
voto TINYINT, 
recensione LONGTEXT,
data DATE,
FOREIGN KEY (id_immobile) REFERENCES Immobili(id),
FOREIGN KEY (id_utente) REFERENCES Utenti(id)
); 