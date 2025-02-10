INSERT INTO immobili (slug, email_proprietario, username_proprietario, titolo_descrittivo, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto, data_eliminazione) 
VALUES 
('appartamento-milano-centrale', 'proprietario1@email.com', 'utente1', 'Appartamento Milano Centrale', 'Via Roma 10, Milano', 'Splendido appartamento in centro città.', 80, 2, 3, 4, NULL),
('villa-rimini-mare', 'proprietario2@email.com', 'utente2', 'Villa Rimini Mare', 'Lungomare 5, Rimini', 'Villa di lusso a due passi dalla spiaggia.', 200, 3, 6, 8, NULL),
('monolocale-firenze', 'proprietario3@email.com', 'utente3', 'Monolocale Firenze', 'Piazza Duomo 15, Firenze', 'Accogliente monolocale con vista Duomo.', 40, 1, 1, 2, NULL);

INSERT INTO tipi_alloggio (nome_tipo_alloggio) 
VALUES 
('Appartamento'),
('Villa'),
('Monolocale'),
('Attico'),
('Casale');

INSERT INTO immobili_tipi_alloggio (immobile_id, tipo_alloggio_id) 
VALUES 
(1, 1), -- L'appartamento Milano Centrale è un "Appartamento"
(2, 2), -- La Villa di Rimini è una "Villa"
(3, 3); -- Il monolocale di Firenze è un "Monolocale"

INSERT INTO recensioni (id_immobile, voto, recensione, data, data_eliminazione, email, username) 
VALUES 
(1, 5, 'Ottimo appartamento, molto pulito e centrale!', '2024-02-01 14:30:00', NULL, 'utente1@email.com', 'utente1'),
(2, 4, 'Bella villa con vista mare, un po’ costosa ma ne vale la pena.', '2024-01-15 10:00:00', NULL, 'utente2@email.com', 'utente2'),
(3, 3, 'Posizione ottima, ma lo spazio è davvero ridotto.', '2024-02-05 16:45:00', NULL, 'utente3@email.com', 'utente3');

INSERT INTO immagini (nome_immagine) 
VALUES 
('milano1.jpg'),
('milano2.jpg'),
('rimini1.jpg'),
('rimini2.jpg'),
('firenze1.jpg');

INSERT INTO immagini_immobili (id_immagine, id_immobile) 
VALUES 
(1, 1), -- milano1.jpg -> Appartamento Milano
(2, 1), -- milano2.jpg -> Appartamento Milano
(3, 2), -- rimini1.jpg -> Villa Rimini
(4, 2), -- rimini2.jpg -> Villa Rimini
(5, 3); -- firenze1.jpg -> Monolocale Firenze

