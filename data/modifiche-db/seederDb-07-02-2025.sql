INSERT INTO Utenti (nome, cognome, email, telefono, username, e_proprietario) VALUES
('Mario', 'Rossi', 'mario.rossi@example.com', '3331234567', 'mariorossi', TRUE),
('Giulia', 'Verdi', 'giulia.verdi@example.com', '3337654321', 'giuliaverdi', FALSE),
('Luca', 'Bianchi', 'luca.bianchi@example.com', '3341234567', 'lucabianchi', TRUE),
('Anna', 'Neri', 'anna.neri@example.com', '3351234567', 'annaneri', FALSE),
('Marco', 'Gialli', 'marco.gialli@example.com', '3361234567', 'marcogialli', TRUE),
('Elena', 'Azzurri', 'elena.azzurri@example.com', '3371234567', 'elenaazzurri', FALSE),
('Paolo', 'Marroni', 'paolo.marroni@example.com', '3381234567', 'paolomarroni', TRUE),
('Sara', 'Bianchi', 'sara.bianchi@example.com', '3391234567', 'sarabianchi', FALSE),
('Davide', 'Rossi', 'davide.rossi@example.com', '3401234567', 'daviderossi', TRUE),
('Valeria', 'Verdi', 'valeria.verdi@example.com', '3411234567', 'valeriaverdi', FALSE);

-- Inserisci immobili
INSERT INTO Immobili (id_utente_proprietario, prezzo_affitto, titolo_descrittivo, indirizzo, imgs, mq, citta, bagni, locali, posti_letto, descrizione) VALUES
(1, 750.00, 'Appartamento luminoso', 'Via Roma, 1', 'img1.jpg', 80, 'Roma', 2, 3, 4, 'Appartamento con ampio salone e due camere da letto'),
(1, 950.00, 'Bilocale moderno', 'Via Milano, 23', 'img2.jpg', 60, 'Milano', 1, 2, 2, 'Bilocale arredato con gusto, perfetto per giovani coppie'),
(3, 650.00, 'Monolocale accogliente', 'Via Napoli, 45', 'img3.jpg', 40, 'Napoli', 1, 1, 1, 'Monolocale situato nel centro storico di Napoli'),
(4, 1200.00, 'Villa con piscina', 'Via Firenze, 67', 'img4.jpg', 200, 'Firenze', 3, 5, 6, 'Villa di lusso con piscina privata e giardino'),
(5, 800.00, 'Trilocale spazioso', 'Via Torino, 89', 'img5.jpg', 100, 'Torino', 2, 4, 5, 'Trilocale con cucina abitabile e ampio soggiorno'),
(6, 1100.00, 'Attico panoramico', 'Via Genova, 12', 'img6.jpg', 150, 'Genova', 3, 4, 4, 'Attico con vista mare e ampio terrazzo'),
(7, 700.00, 'Loft moderno', 'Via Bologna, 34', 'img7.jpg', 70, 'Bologna', 1, 2, 2, 'Loft arredato in stile moderno, ideale per giovani professionisti'),
(8, 900.00, 'Quadrilocale centrale', 'Via Venezia, 56', 'img8.jpg', 120, 'Venezia', 2, 4, 5, 'Appartamento situato nel cuore della cittÃ , comodo per i servizi'),
(9, 850.00, 'Bilocale grazioso', 'Via Palermo, 78', 'img9.jpg', 65, 'Palermo', 1, 2, 3, 'Bilocale in zona tranquilla, con giardino condominiale'),
(10, 950.00, 'Trilocale luminoso', 'Via Bari, 90', 'img10.jpg', 90, 'Bari', 2, 3, 4, 'Trilocale con ampie finestre e balconi, molto luminoso');

-- Inserisci servizi
INSERT INTO Servizi (nome_servizio) VALUES
('Wi-Fi'),
('Parcheggio'),
('Aria Condizionata'),
('Piscina'),
('Palestra'),
('Portineria'),
('Ascensore'),
('Giardino'),
('Riscaldamento Centralizzato'),
('Lavatrice');

-- Inserisci immobili_servizi
INSERT INTO Immobili_Servizi (id_immobile, id_servizio) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(4, 4),
(4, 5),
(5, 2),
(5, 6),
(6, 7),
(6, 8),
(7, 1),
(8, 9),
(9, 1),
(10, 10);

-- Inserisci tipi_alloggio
INSERT INTO Tipi_Alloggio (nome_tipo_alloggio) VALUES
('Appartamento'),
('Villa'),
('Monolocale'),
('Attico'),
('Loft'),
('Quadrilocale'),
('Bilocale'),
('Trilocale');

-- Inserisci immobili_tipi_alloggio
INSERT INTO Immobili_Tipi_Alloggio (id_immobile, id_tipo_alloggio) VALUES
(1, 1),
(2, 7),
(3, 3),
(4, 2),
(5, 8),
(6, 4),
(7, 5),
(8, 6),
(9, 7),
(10, 8);

-- Inserisci recensioni
INSERT INTO Recensioni (id_immobile, id_utente, voto, recensione, data) VALUES
(1, 2, 4, 'Ottimo appartamento, molto luminoso', '2025-02-05'),
(2, 1, 5, 'Bilocale moderno e ben arredato', '2025-02-06'),
(3, 3, 3, 'Monolocale accogliente ma piccolo', '2025-02-07'),
(4, 4, 5, 'Villa stupenda con piscina', '2025-02-08'),
(5, 5, 4, 'Trilocale spazioso e ben ubicato', '2025-02-09'),
(6, 6, 5, 'Attico con vista mozzafiato', '2025-02-10'),
(7, 7, 3, 'Loft moderno ma un po\' rumoroso', '2025-02-11'),
(8, 8, 4, 'Quadrilocale centrale, ottima posizione', '2025-02-12'),
(9, 9, 4, 'Bilocale grazioso e tranquillo', '2025-02-13'),
(10, 10, 5, 'Trilocale luminoso e accogliente', '2025-02-14');