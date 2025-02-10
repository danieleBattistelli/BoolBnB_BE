CREATE TABLE immobili (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    email_proprietario VARCHAR(255) NOT NULL,
    username_proprietario VARCHAR(255) NOT NULL,
    titolo_descrittivo VARCHAR(255) NOT NULL,
    indirizzo_completo VARCHAR(255) NOT NULL,
    descrizione TEXT NOT NULL,
    mq INT NOT NULL,
    bagni INT NOT NULL,
    locali INT NOT NULL,
    posti_letto INT NOT NULL,
    data_eliminazione DATETIME DEFAULT NULL
);

CREATE TABLE tipi_alloggio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_tipo_alloggio VARCHAR(255) NOT NULL
);

CREATE TABLE immobili_tipi_alloggio (
    immobile_id BIGINT NOT NULL,
    tipo_alloggio_id BIGINT NOT NULL,
    PRIMARY KEY (immobile_id, tipo_alloggio_id),
    FOREIGN KEY (immobile_id) REFERENCES immobili(id) ON DELETE CASCADE,
    FOREIGN KEY (tipo_alloggio_id) REFERENCES tipi_alloggio(id) ON DELETE CASCADE
);

CREATE TABLE immagini (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_immagine VARCHAR(255) NOT NULL
);

CREATE TABLE immagini_immobili (
    id_immagine BIGINT NOT NULL,
    id_immobile BIGINT NOT NULL,
    PRIMARY KEY (id_immagine, id_immobile),
    FOREIGN KEY (id_immagine) REFERENCES immagini(id) ON DELETE CASCADE,
    FOREIGN KEY (id_immobile) REFERENCES immobili(id) ON DELETE CASCADE
);

CREATE TABLE recensioni (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_immobile BIGINT NOT NULL,
    voto TINYINT NOT NULL CHECK (voto BETWEEN 1 AND 5),
    recensione LONGTEXT NOT NULL,
    data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_eliminazione DATETIME DEFAULT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_immobile) REFERENCES immobili(id) ON DELETE CASCADE
);
