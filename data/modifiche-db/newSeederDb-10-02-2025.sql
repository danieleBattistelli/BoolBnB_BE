-- Popolamento della tabella immobili
INSERT INTO immobili (slug, email_proprietario, username_proprietario, titolo_descrittivo, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto) VALUES
('appartamento-vista-mare', 'mario.rossi@example.com', 'mario_rossi', 'Appartamento Vista Mare', 'Via Lungomare, 10, Napoli, Italia', 'Splendido appartamento con vista mare.', 80, 2, 3, 5),
('villa-immersa-nel-verde', 'luca.bianchi@example.com', 'luca_bianchi', 'Villa Immersa nel Verde', 'Via dei Pini, 20, Firenze, Italia', 'Villa con ampio giardino.', 200, 3, 6, 8);

-- Popolamento della tabella tipi_alloggio
INSERT INTO tipi_alloggio (nome_tipo_alloggio) VALUES
('Appartamento'),
('Villa'),
('Monolocale'),
('Attico');

-- Popolamento della tabella immobili_tipi_alloggio
INSERT INTO immobili_tipi_alloggio (slug_immobile, tipo_alloggio_id) VALUES
('appartamento-vista-mare', 1),
('villa-immersa-nel-verde', 2);

-- Popolamento della tabella immagini
INSERT INTO immagini (nome_immagine, slug_immobile) VALUES
('appartamento1.jpg', 'appartamento-vista-mare'),
('appartamento2.jpg', 'appartamento-vista-mare'),
('villa1.jpg', 'villa-immersa-nel-verde'),
('villa2.jpg', 'villa-immersa-nel-verde');

-- Popolamento della tabella recensioni
INSERT INTO recensioni (id_immobile, voto, recensione, email, username) VALUES
(1, 5, 'Bellissimo appartamento, vista incredibile!', 'giulia.verdi@example.com', 'giulia_verdi'),
(2, 4, 'Villa molto spaziosa, ottimo giardino.', 'andrea.neri@example.com', 'andrea_neri');
