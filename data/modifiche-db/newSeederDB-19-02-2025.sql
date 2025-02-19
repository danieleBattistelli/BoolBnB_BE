
INSERT INTO immobili (id, slug, email_proprietario, username_proprietario, titolo_descrittivo, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto) VALUES
(41, 'villa-sul-mare', 'marco.rossi@example.com', 'marco_rossi', 'Villa sul Mare', 'Via del Mare, 10, Amalfi, Italia', 'Villa con accesso diretto alla spiaggia.', 300, 4, 8, 10),
(42, 'chalet-alpino', 'laura.bianchi@example.com', 'laura_bianchi', 'Chalet Alpino', 'Via delle Alpi, 5, Courmayeur, Italia', 'Chalet di lusso con vista sulle montagne.', 150, 3, 5, 6),
(43, 'attico-centrale', 'roberto.verdi@example.com', 'roberto_verdi', 'Attico Centrale', 'Piazza della Repubblica, 1, Roma, Italia', 'Attico con terrazza panoramica.', 200, 3, 6, 8),
(44, 'trullo-tradizionale', 'anna.neri@example.com', 'anna_neri', 'Trullo Tradizionale', 'Contrada Trulli, 7, Alberobello, Italia', 'Trullo autentico con piscina.', 90, 2, 3, 4),
(45, 'loft-industriale', 'paolo.martini@example.com', 'paolo_martini', 'Loft Industriale', 'Via dei Navigli, 12, Milano, Italia', 'Loft moderno in stile industriale.', 120, 2, 3, 5),
(46, 'villa-toscana', 'claudia.ferrari@example.com', 'claudia_ferrari', 'Villa Toscana', 'Via del Chianti, 20, Siena, Italia', 'Villa storica con vigneto.', 350, 4, 8, 10),
(47, 'casa-sulla-costiera', 'marco.esposito@example.com', 'marco_esposito', 'Casa sulla Costiera', 'Via Marina, 15, Positano, Italia', 'Casa con terrazza vista mare.', 130, 2, 4, 6),
(48, 'appartamento-veneziano', 'gabriella.moretti@example.com', 'gabriella_moretti', 'Appartamento Veneziano', 'Calle dei Fabbri, 8, Venezia, Italia', 'Appartamento storico nel centro di Venezia.', 110, 2, 3, 4),
(49, 'villa-sul-lago', 'stefano.bianchi@example.com', 'stefano_bianchi', 'Villa sul Lago', 'Via del Lago, 22, Como, Italia', 'Villa di lusso con vista lago.', 400, 5, 10, 12),
(50, 'casale-in-umbria', 'valentina.martini@example.com', 'valentina_martini', 'Casale in Umbria', 'Strada del Vino, 30, Montefalco, Italia', 'Casale rustico con vigneto.', 250, 3, 6, 8),
(51, 'villa-moderna', 'marco.rossi@example.com', 'marco_rossi', 'Villa Moderna', 'Via delle Palme, 10, Palermo, Italia', 'Villa moderna con piscina.', 300, 4, 8, 10),
(52, 'chalet-di-montagna', 'laura.bianchi@example.com', 'laura_bianchi', 'Chalet di Montagna', 'Via delle Nevi, 5, Cortina d''Ampezzo, Italia', 'Chalet di lusso con vista sulle Dolomiti.', 160, 3, 5, 6),
(53, 'attico-lussuoso', 'roberto.verdi@example.com', 'roberto_verdi', 'Attico Lussuoso', 'Piazza del Popolo, 1, Roma, Italia', 'Attico con terrazza e jacuzzi.', 220, 3, 6, 8),
(54, 'trullo-ristrutturato', 'anna.neri@example.com', 'anna_neri', 'Trullo Ristrutturato', 'Contrada Trulli, 9, Alberobello, Italia', 'Trullo ristrutturato con giardino.', 100, 2, 3, 4),
(55, 'loft-moderno', 'paolo.martini@example.com', 'paolo_martini', 'Loft Moderno', 'Via della Moda, 15, Milano, Italia', 'Loft moderno con vista sulla città.', 130, 2, 3, 5),
(56, 'villa-nel-chianti', 'claudia.ferrari@example.com', 'claudia_ferrari', 'Villa nel Chianti', 'Via del Vino, 25, Siena, Italia', 'Villa con piscina e vigneto.', 360, 4, 8, 10),
(57, 'casa-sul-mare', 'marco.esposito@example.com', 'marco_esposito', 'Casa sul Mare', 'Via della Spiaggia, 18, Positano, Italia', 'Casa con accesso diretto alla spiaggia.', 140, 2, 4, 6),
(58, 'appartamento-storico', 'gabriella.moretti@example.com', 'gabriella_moretti', 'Appartamento Storico', 'Calle dei Miracoli, 10, Venezia, Italia', 'Appartamento storico con vista sul canale.', 120, 2, 3, 4),
(59, 'villa-sul-lago-como', 'stefano.bianchi@example.com', 'stefano_bianchi', 'Villa sul Lago di Como', 'Via Regina, 30, Bellagio, Italia', 'Villa di lusso con piscina e vista lago.', 420, 5, 10, 12),
(60, 'casale-rustico', 'valentina.martini@example.com', 'valentina_martini', 'Casale Rustico', 'Strada del Sagrantino, 35, Montefalco, Italia', 'Casale rustico con vigneto e piscina.', 270, 3, 6, 8);

-- Inserimento nuovi tipi di alloggio
INSERT INTO tipi_alloggio (id, nome_tipo_alloggio) VALUES
(1, 'Appartamento'),
(2, 'Villa'),
(3, 'Attico'),
(4, 'Casa'),
(5, 'Monolocale'),
(6, 'Bungalow'),
(7, 'Villa sul Lago'),
(8, 'Loft'),
(9, 'Villa Storica'),
(10, 'Casetta');

-- Popolamento della tabella immobili_tipi_alloggio
INSERT INTO immobili_tipi_alloggio (slug_immobile, tipo_alloggio_id) VALUES
('appartamento-moderno', 1),
('villa-con-piscina', 2),
('attico-panorama', 3),
('casa-del-campo', 4),
('monolocale-luminoso', 5),
('bungalow-nel-verde', 6),
('villa-sul-lago', 7),
('loft-lussuoso', 8),
('attico-con-terrazza', 3),
('casetta-in-montagna', 10),
('villa-della-collina', 2),
('monolocale-centrale-roma', 5),
('attico-della-citta', 3),
('villa-al-mare', 2),
('loft-urbano', 8),
('casetta-di-mare', 10),
('appartamento-trilocale', 1),
('bungalow-con-giardino', 6),
('villa-storica', 9),
('attico-superior', 3);


-- Inserimento immagini per i nuovi immobili
INSERT INTO immagini (id, nome_immagine, slug_immobile) VALUES
(21, 'moderno1.jpg', 'appartamento-moderno'),
(22, 'moderno2.jpg', 'appartamento-moderno'),
(23, 'piscina1.jpg', 'villa-con-piscina'),
(24, 'piscina2.jpg', 'villa-con-piscina'),
(25, 'panorama1.jpg', 'attico-panorama'),
(26, 'panorama2.jpg', 'attico-panorama'),
(27, 'campo1.jpg', 'casa-del-campo'),
(28, 'campo2.jpg', 'casa-del-campo'),
(29, 'luminoso1.jpg', 'monolocale-luminoso'),
(30, 'luminoso2.jpg', 'monolocale-luminoso'),
(31, 'verde1.jpg', 'bungalow-nel-verde'),
(32, 'verde2.jpg', 'bungalow-nel-verde'),
(33, 'lago1.jpg', 'villa-sul-lago'),
(34, 'lago2.jpg', 'villa-sul-lago'),
(35, 'lussuoso1.jpg', 'loft-lussuoso'),
(36, 'lussuoso2.jpg', 'loft-lussuoso'),
(37, 'terrazza1.jpg', 'attico-con-terrazza'),
(38, 'terrazza2.jpg', 'attico-con-terrazza'),
(39, 'montagna1.jpg', 'casetta-in-montagna'),
(40, 'montagna2.jpg', 'casetta-in-montagna');




-- Inserimento recensioni per i nuovi immobili
INSERT INTO recensioni (id, id_immobile, voto, recensione, email, username) VALUES
(31, 31, 5, 'Appartamento moderno e molto luminoso.', 'giuseppe.rossi@example.com', 'giuseppe_rossi'),
(12, 12, 5, 'Villa con piscina meravigliosa!', 'mario.rossi@example.com', 'mario_rossi'),
(13, 13, 4, 'Attico con vista fantastica, ma un po costoso.', 'carla.bianchi@example.com', 'carla_bianchi'),
(14, 14, 4, 'Casa spaziosa con ampio giardino.', 'alessandro.ferrari@example.com', 'alessandro_ferrari'),
(15, 15, 3, 'Monolocale piccolo ma comodo.', 'martina.neri@example.com', 'martina_neri'),
(16, 16, 4, 'Bungalow carino, ma un po isolato.', 'andrea.galli@example.com', 'andrea_galli'),
(17, 17, 5, 'Villa bellissima con giardino perfetto.', 'mario.ferrari@example.com', 'mario_ferrari'),
(18, 18, 5, 'Loft molto elegante e ben arredato.', 'giovanni.pirro@example.com', 'giovanni_pirro'),
(19, 19, 5, 'Attico molto bello e ben posizionato.', 'giulia.ferrari@example.com', 'giulia_ferrari'),
(20, 20, 4, 'Casetta accogliente, ma la montagna è un po lontana.', 'francesco.verdi@example.com', 'francesco_verdi'),
(21, 21, 5, 'Villa con piscina fantastica.', 'luigi.gori@example.com', 'luigi_gori'),
(22, 22, 4, 'Monolocale centrale, perfetto per un weekend.', 'maria.bianchi@example.com', 'maria_bianchi'),
(23, 23, 5, 'Attico magnifico con terrazza enorme.', 'lucia.ferrari@example.com', 'lucia_ferrari'),
(24, 24, 5, 'Villa sulla spiaggia con vista straordinaria.', 'antonio.galante@example.com', 'antonio_galante'),
(25, 25, 4, 'Loft elegante e moderno, ma un po rumoroso.', 'giorgia.martini@example.com', 'giorgia_martini'),
(26, 26, 3, 'Casetta piccola, ma carina.', 'alberto.russo@example.com', 'alberto_russo'),
(27, 27, 4, 'Appartamento ben arredato e tranquillo.', 'paolo.mancini@example.com', 'paolo_mancini'),
(28, 28, 5, 'Bungalow molto accogliente con giardino.', 'elena.dimarco@example.com', 'elena_dimarco'),
(29, 29, 5, 'Villa storica meravigliosa e ben mantenuta.', 'michele.gori@example.com', 'michele_gori'),
(30, 30, 5, 'Attico super lussuoso con vista mozzafiato.', 'valentina.russo@example.com', 'valentina_russo');

