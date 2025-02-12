-- Popolamento della tabella immobili
INSERT INTO immobili (id, slug, email_proprietario, username_proprietario, titolo_descrittivo, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto) VALUES
(1, 'appartamento-vista-mare', 'mario.rossi@example.com', 'mario_rossi', 'Appartamento Vista Mare', 'Via Lungomare, 10, Napoli, Italia', 'Splendido appartamento con vista mare.', 80, 2, 3, 5),
(2, 'villa-immersa-nel-verde', 'luca.bianchi@example.com', 'luca_bianchi', 'Villa Immersa nel Verde', 'Via dei Pini, 20, Firenze, Italia', 'Villa con ampio giardino.', 200, 3, 6, 8),
(3, 'monolocale-centrale', 'giulia.verdi@example.com', 'giulia_verdi', 'Monolocale Centrale', 'Via del Corso, 5, Roma, Italia', 'Monolocale nel centro della città.', 35, 1, 1, 2),
(4, 'attico-lussuoso', 'andrea.neri@example.com', 'andrea_neri', 'Attico Lussuoso', 'Via Veneto, 15, Milano, Italia', 'Attico con vista panoramica.', 120, 2, 4, 6),
(5, 'casetta-di-campagna', 'federica.bianchi@example.com', 'federica_bianchi', 'Casetta di Campagna', 'Strada Provinciale, 30, Siena, Italia', 'Piccola casetta immersa nel verde.', 70, 1, 3, 4),
(6, 'loft-industriale', 'lorenzo.marino@example.com', 'lorenzo_marino', 'Loft Industriale', 'Via Manzoni, 50, Bologna, Italia', 'Spazioso loft in stile industriale.', 90, 1, 2, 3),
(7, 'bungalow-al-mare', 'chiara.russo@example.com', 'chiara_russo', 'Bungalow al Mare', 'Via Marittima, 25, Genova, Italia', 'Bungalow con accesso diretto alla spiaggia.', 60, 2, 2, 4),
(8, 'casa-colonica', 'alessandro.vitali@example.com', 'alessandro_vitali', 'Casa Colonica', 'Via delle Campagne, 40, Perugia, Italia', 'Casa colonica ristrutturata.', 150, 3, 5, 7),
(9, 'attico-moderno', 'valentina.ferrari@example.com', 'valentina_ferrari', 'Attico Moderno', 'Via dell\'Arte, 8, Venezia, Italia', 'Attico moderno con terrazza.', 100, 2, 4, 5),
(10, 'appartamento-elegante', 'francesco.gori@example.com', 'francesco_gori', 'Appartamento Elegante', 'Via del Teatro, 12, Torino, Italia', 'Appartamento elegante e centrale.', 85, 2, 3, 4);

-- Popolamento della tabella tipi_alloggio
INSERT INTO tipi_alloggio (id, nome_tipo_alloggio) VALUES
(1, 'Appartamento'),
(2, 'Villa'),
(3, 'Monolocale'),
(4, 'Attico'),
(5, 'Casetta'),
(6, 'Loft'),
(7, 'Bungalow'),
(8, 'Casa Colonica'),
(9, 'Attico Moderno'),
(10, 'Appartamento Elegante');

-- Popolamento della tabella immobili_tipi_alloggio
INSERT INTO immobili_tipi_alloggio (id, slug_immobile, tipo_alloggio_id) VALUES
(1, 'appartamento-vista-mare', 1),
(2, 'villa-immersa-nel-verde', 2),
(3, 'monolocale-centrale', 3),
(4, 'attico-lussuoso', 4),
(5, 'casetta-di-campagna', 5),
(6, 'loft-industriale', 6),
(7, 'bungalow-al-mare', 7),
(8, 'casa-colonica', 8),
(9, 'attico-moderno', 9),
(10, 'appartamento-elegante', 10);

-- Popolamento della tabella immagini
INSERT INTO immagini (id, nome_immagine, slug_immobile) VALUES
(1, 'appartamento1.jpg', 'appartamento-vista-mare'),
(2, 'appartamento2.jpg', 'appartamento-vista-mare'),
(3, 'villa1.jpg', 'villa-immersa-nel-verde'),
(4, 'villa2.jpg', 'villa-immersa-nel-verde'),
(5, 'monolocale1.jpg', 'monolocale-centrale'),
(6, 'monolocale2.jpg', 'monolocale-centrale'),
(7, 'attico1.jpg', 'attico-lussuoso'),
(8, 'attico2.jpg', 'attico-lussuoso'),
(9, 'casetta1.jpg', 'casetta-di-campagna'),
(10, 'casetta2.jpg', 'casetta-di-campagna'),
(11, 'loft1.jpg', 'loft-industriale'),
(12, 'loft2.jpg', 'loft-industriale'),
(13, 'bungalow1.jpg', 'bungalow-al-mare'),
(14, 'bungalow2.jpg', 'bungalow-al-mare'),
(15, 'colonica1.jpg', 'casa-colonica'),
(16, 'colonica2.jpg', 'casa-colonica'),
(17, 'moderno1.jpg', 'attico-moderno'),
(18, 'moderno2.jpg', 'attico-moderno'),
(19, 'elegante1.jpg', 'appartamento-elegante'),
(20, 'elegante2.jpg', 'appartamento-elegante');

-- Popolamento della tabella recensioni
INSERT INTO recensioni (id, id_immobile, voto, recensione, email, username) VALUES
(1, 1, 5, 'Bellissimo appartamento, vista incredibile!', 'giulia.verdi@example.com', 'giulia_verdi'),
(2, 2, 4, 'Villa molto spaziosa, ottimo giardino.', 'andrea.neri@example.com', 'andrea_neri'),
(3, 3, 3, 'Monolocale centrale, ma molto piccolo.', 'federica.bianchi@example.com', 'federica_bianchi'),
(4, 4, 5, 'Attico lussuoso, vale ogni centesimo.', 'luigi.rossi@example.com', 'luigi_rossi'),
(5, 5, 4, 'Casetta di campagna accogliente.', 'maria.verdi@example.com', 'maria_verdi'),
(6, 6, 4, 'Loft spazioso e ben arredato.', 'elena.mancini@example.com', 'elena_mancini'),
(7, 7, 5, 'Bungalow perfetto per le vacanze.', 'giorgio.falco@example.com', 'giorgio_falco'),
(8, 8, 4, 'Casa colonica rustica e affascinante.', 'simona.ferri@example.com', 'simona_ferri'),
(9, 9, 5, 'Attico moderno e ben posizionato.', 'paolo.marchi@example.com', 'paolo_marchi'),
(10, 10, 4, 'Appartamento elegante e confortevole.', 'martina.bellini@example.com', 'martina_bellini');
