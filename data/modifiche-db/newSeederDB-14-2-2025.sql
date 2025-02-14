INSERT INTO immobili (id, slug, email_proprietario, username_proprietario, titolo_descrittivo, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto) VALUES
(31, 'appartamento-moderno', 'giuseppe.rossi@example.com', 'giuseppe_rossi', 'Appartamento Moderno', 'Via Roma, 25, Milano, Italia', 'Appartamento moderno con ampie finestre.', 85, 2, 3, 4),
(12, 'villa-con-piscina', 'mario.rossi@example.com', 'mario_rossi', 'Villa con Piscina', 'Viale delle Palme, 15, Torino, Italia', 'Villa con piscina e ampio giardino.', 250, 4, 7, 10),
(13, 'attico-panorama', 'carla.bianchi@example.com', 'carla_bianchi', 'Attico con Panorama', 'Piazza del Duomo, 3, Firenze, Italia', 'Attico con vista spettacolare sulla città.', 140, 3, 5, 7),
(14, 'casa-del-campo', 'alessandro.ferrari@example.com', 'alessandro_ferrari', 'Casa del Campo', 'Strada della Collina, 40, Lucca, Italia', 'Casa nel campo con grandi spazi verdi.', 120, 2, 4, 6),
(15, 'monolocale-luminoso', 'martina.neri@example.com', 'martina_neri', 'Monolocale Luminoso', 'Corso Vittorio Emanuele, 22, Bologna, Italia', 'Monolocale luminoso con balcone.', 30, 1, 1, 2),
(16, 'bungalow-nel-verde', 'andrea.galli@example.com', 'andrea_galli', 'Bungalow nel Verde', 'Via dei Cipressi, 8, Pisa, Italia', 'Bungalow in mezzo alla natura.', 70, 1, 2, 4),
(17, 'villa-sul-lago', 'mario.ferrari@example.com', 'mario_ferrari', 'Villa sul Lago', 'Lungolago, 14, Como, Italia', 'Villa con vista sul lago e giardino.', 220, 3, 6, 8),
(18, 'loft-lussuoso', 'giovanni.pirro@example.com', 'giovanni_pirro', 'Loft Lussuoso', 'Via Dante, 18, Napoli, Italia', 'Loft elegante in stile moderno.', 100, 2, 3, 5),
(19, 'attico-con-terrazza', 'giulia.ferrari@example.com', 'giulia_ferrari', 'Attico con Terrazza', 'Piazza Garibaldi, 6, Roma, Italia', 'Attico con grande terrazza panoramica.', 130, 2, 4, 6),
(20, 'casetta-in-montagna', 'francesco.verdi@example.com', 'francesco_verdi', 'Casetta in Montagna', 'Via del Bosco, 9, Aosta, Italia', 'Casetta accogliente in montagna.', 60, 1, 3, 4),
(21, 'villa-della-collina', 'luigi.gori@example.com', 'luigi_gori', 'Villa della Collina', 'Via dei Fiori, 10, Verona, Italia', 'Villa con parco privato e piscina.', 300, 4, 8, 12),
(22, 'monolocale-centrale-roma', 'maria.bianchi@example.com', 'maria_bianchi', 'Monolocale Centrale Roma', 'Piazza Venezia, 11, Roma, Italia', 'Monolocale nel cuore di Roma.', 45, 1, 1, 2),
(23, 'attico-della-citta', 'lucia.ferrari@example.com', 'lucia_ferrari', 'Attico della Città', 'Via delle Mura, 21, Milano, Italia', 'Attico con vista sulla città e terrazza.', 120, 2, 4, 5),
(24, 'villa-al-mare', 'antonio.galante@example.com', 'antonio_galante', 'Villa al Mare', 'Via Marina, 17, Cagliari, Italia', 'Villa con giardino a due passi dalla spiaggia.', 280, 4, 6, 9),
(25, 'loft-urbano', 'giorgia.martini@example.com', 'giorgia_martini', 'Loft Urbano', 'Via della Stazione, 5, Torino, Italia', 'Loft elegante in un contesto urbano moderno.', 110, 2, 3, 5),
(26, 'casetta-di-mare', 'alberto.russo@example.com', 'alberto_russo', 'Casetta di Mare', 'Viale del Mare, 10, Genova, Italia', 'Piccola casetta fronte mare.', 75, 1, 2, 4),
(27, 'appartamento-trilocale', 'paolo.mancini@example.com', 'paolo_mancini', 'Appartamento Trilocale', 'Via Trento, 8, Firenze, Italia', 'Trilocale arredato e confortevole.', 90, 2, 3, 5),
(28, 'bungalow-con-giardino', 'elena.dimarco@example.com', 'elena_dimarco', 'Bungalow con Giardino', 'Strada delle Palme, 14, Perugia, Italia', 'Bungalow con giardino privato.', 80, 2, 3, 6),
(29, 'villa-storica', 'michele.gori@example.com', 'michele_gori', 'Villa Storica', 'Corso Italia, 45, Palermo, Italia', 'Villa storica ristrutturata con ampio parco.', 350, 5, 8, 12),
(30, 'attico-superior', 'valentina.russo@example.com', 'valentina_russo', 'Attico Superior', 'Piazza Cavour, 30, Napoli, Italia', 'Attico di lusso con vista sul Golfo.', 180, 3, 5, 7);


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
('attico-con-terrazza', 9),
('casetta-in-montagna', 10),
('villa-della-collina', 1),
('monolocale-centrale-roma', 2),
('attico-della-citta', 3),
('villa-al-mare', 4),
('loft-urbano', 5),
('casetta-di-mare', 6),
('appartamento-trilocale', 7),
('bungalow-con-giardino', 8),
('villa-storica', 9),
('attico-superior', 10);


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
(30, 30, 5, 'Attico super lussuoso con vista mozzafiato.', 'valentina.russo@example.com', 'valentina_russo'),

(32, 1, 5, 'Bellissimo appartamento con una vista mozzafiato. Perfetto per una vacanza al mare!', 'giulia.verdi@example.com', 'giulia_verdi'),
(33, 1, 4, 'L appartamento è davvero accogliente e ben arredato. La vista sul mare è stupenda!', 'andrea.neri@example.com', 'andrea_neri'),
(34, 1, 5, 'Ottimo posto per una fuga romantica. La posizione è perfetta e la vista è incredibile.', 'elena.mancini@example.com', 'elena_mancini'),

(35, 2, 4, 'Villa spaziosa con un giardino bellissimo. Ottima per famiglie o gruppi.', 'maria.verdi@example.com', 'maria_verdi'),
(36, 2, 5, 'Una villa immersa nel verde, perfetta per una vacanza lontano dal caos della città. Consigliatissima!', 'giorgio.falco@example.com', 'giorgio_falco'),
(37, 2, 4, 'La villa è molto bella e ben equipaggiata, ma avrei preferito una piscina.', 'simona.ferri@example.com', 'simona_ferri'),

(38, 3, 3, 'Il monolocale è in una zona centrale, ma è davvero piccolo per due persone. Non c è molto spazio.', 'paolo.marchi@example.com', 'paolo_marchi'),
(39, 3, 4, 'Posizione perfetta per visitare la città, ma avrei apprezzato un po più di spazio.', 'martina.bellini@example.com', 'martina_bellini'),
(40, 3, 3, 'Monolocale carino ma abbastanza spartano. Ottimo per brevi soggiorni.', 'luca.bianchi@example.com', 'luca_bianchi'),

(41, 4, 5, 'L attico è fantastico! La vista panoramica è spettacolare, ideale per una cena romantica.', 'luigi.rossi@example.com', 'luigi_rossi'),
(42, 4, 5, 'Attico lussuoso con tutti i comfort. Lo consiglio vivamente a chi cerca il massimo del lusso.', 'francesco.gori@example.com', 'francesco_gori'),
(43, 4, 4, 'Posizione centrale, ma il prezzo è un po alto. Comunque molto bello e ben arredato.', 'maria.verdi@example.com', 'maria_verdi'),

(44, 5, 4, 'La casetta è molto carina e accogliente, ideale per una fuga dal caos. Un po piccola per più di due persone.', 'elena.mancini@example.com', 'elena_mancini'),
(45, 5, 5, 'Perfetta per chi ama la natura. Molto tranquilla e ben posizionata. Un vero angolo di paradiso.', 'simona.ferri@example.com', 'simona_ferri'),
(46, 5, 4, 'Carina e ben tenuta, ma sarebbe bello avere una cucina più grande.', 'giorgio.falco@example.com', 'giorgio_falco'),

(47, 6, 4, 'Loft spazioso e ben arredato, ma il quartiere potrebbe essere più tranquillo. Nel complesso è un ottimo soggiorno.', 'giulia.verdi@example.com', 'giulia_verdi'),
(48, 6, 5, 'Fantastico loft in stile industriale. Molto moderno e ben posizionato per girare la città.', 'paolo.marchi@example.com', 'paolo.marchi'),
(49, 6, 4, 'L arredamento è veramente bello, ma il loft è un po rumoroso la notte. Comunque molto elegante.', 'maria.verdi@example.com', 'maria_verdi'),

(50, 7, 5, 'Perfetto per una vacanza al mare. Spiaggia a pochi passi e bungalow confortevole. Consigliato!', 'luigi.rossi@example.com', 'luigi_rossi'),
(51, 7, 4, 'Bungalow bello e ben posizionato, ma la privacy potrebbe essere migliorata. Ottimo comunque per una vacanza.', 'giorgio.falco@example.com', 'giorgio_falco'),
(52, 7, 5, 'Ottima esperienza! Il bungalow è vicino al mare e molto comodo. Un vero paradiso.', 'elena.mancini@example.com', 'elena_mancini'),

(53, 8, 4, 'La casa colonica è molto bella e rustica. Però è abbastanza isolata e senza molti servizi nelle vicinanze.', 'maria.verdi@example.com', 'maria_verdi'),
(54, 8, 5, 'Casa colonica fantastica, perfetta per chi cerca un soggiorno tranquillo. Atmosfera molto accogliente.', 'giorgio.falco@example.com', 'giorgio_falco'),
(55, 8, 4, 'Molto affascinante, ma sarebbe meglio se avesse più modernità. Comunque l esperienza è stata positiva.', 'simona.ferri@example.com', 'simona_ferri'),

(56, 9, 5, 'Attico perfetto! Molto moderno e ben arredato. Posizione eccellente.', 'giulia.verdi@example.com', 'giulia_verdi'),
(57, 9, 4, 'Il terrazzo è incredibile! Però il prezzo è un po alto per quello che offre.', 'elena.mancini@example.com', 'elena_mancini'),
(58, 9, 5, 'Ottimo soggiorno. La vista è spettacolare, davvero un’esperienza da non perdere.', 'luca.bianchi@example.com', 'luca_bianchi'),

(59, 10, 4, 'Appartamento elegante e molto centrale. Perfetto per visitare Torino, ma avrei preferito più privacy.', 'martina.bellini@example.com', 'martina_bellini'),
(60, 10, 5, 'Molto elegante e ben arredato. Un ottimo punto di partenza per esplorare la città.', 'francesco.gori@example.com', 'francesco_gori'),
(61, 10, 4, 'L appartamento è molto bello ma un po rumoroso di notte. In generale, comunque, una buona scelta.', 'giulia.verdi@example.com', 'giulia_verdi');

(62, 11, 4, 'Loft davvero bello, ma un po rumoroso la notte. Ottimo comunque per un soggiorno breve.', 'mario.rossi@example.com', 'mario_rossi'),
(63, 11, 5, 'Design fantastico! Spazioso e molto moderno, ideale per soggiorni di lunga durata.', 'valentina.ferrari@example.com', 'valentina_ferrari'),
(64, 11, 4, 'Molto bello, ma la zona è un po troppo turistica per i miei gusti. Comunque una buona esperienza.', 'francesco.gori@example.com', 'francesco_gori'),

(65, 12, 5, 'Il bungalow è perfetto per una vacanza al mare. La posizione è ideale e molto tranquilla.', 'luca.bianchi@example.com', 'luca_bianchi'),
(66, 12, 4, 'La spiaggia è vicinissima, ma mi sarebbe piaciuto un po più di privacy. Per il resto è davvero carino.', 'giulia.verdi@example.com', 'giulia_verdi'),
(67, 12, 5, 'Bungalow spazioso e ben arredato. Ottima scelta per chi vuole rilassarsi al mare.', 'paolo.marchi@example.com', 'paolo_marchi'),

(68, 13, 4, 'La casa colonica è molto affascinante e immersa nel verde. Perfetta per chi cerca tranquillità.', 'martina.bellini@example.com', 'martina_bellini'),
(69, 13, 5, 'Un posto da sogno! La casa è bellissima e ben tenuta. Se cercate pace e natura, questo è il posto giusto.', 'maria.verdi@example.com', 'maria_verdi'),
(70, 13, 4, 'Casa molto bella ma un po isolata. Ottima per chi ama la natura, ma un po lontana dai servizi.', 'simona.ferri@example.com', 'simona.ferri'),

(71, 14, 5, 'Attico davvero spettacolare! La vista è mozzafiato e il design interno è impeccabile.', 'giorgio.falco@example.com', 'giorgio_falco'),
(72, 14, 4, 'Molto elegante e ben posizionato. Solo un po troppo costoso per il mio budget.', 'elena.mancini@example.com', 'elena_mancini'),
(73, 14, 5, 'Posizione eccellente e terrazzo incredibile. Un soggiorno perfetto.', 'francesco.gori@example.com', 'francesco_gori'),

(74, 15, 4, 'Molto accogliente, ma avrei preferito avere un po più di spazio. Comunque ottima scelta per un soggiorno tranquillo.', 'luigi.rossi@example.com', 'luigi_rossi'),
(75, 15, 5, 'Casa davvero carina e ben posizionata. Perfetta per un weekend romantico in campagna.', 'paolo.marchi@example.com', 'paolo_marchi'),
(76, 15, 4, 'Lambiente è molto rilassante, ma la casa è un po piccola per una famiglia numerosa.', 'giulia.verdi@example.com', 'giulia_verdi'),

(77, 16, 4, 'Loft molto bello ma un po troppo costoso per quello che offre. Tuttavia, è una buona scelta per chi cerca qualcosa di moderno.', 'francesco.gori@example.com', 'francesco_gori'),
(78, 16, 5, 'Stile industriale fantastico. L arredamento è di altissima qualità. Consigliatissimo!', 'maria.verdi@example.com', 'maria_verdi'),
(79, 16, 4, 'Loft elegante e ben posizionato, ma il quartiere è un po troppo rumoroso.', 'giulia.verdi@example.com', 'giulia_verdi'),

(80, 17, 5, 'Posizione perfetta per la vacanza al mare. Il bungalow è molto accogliente e ben arredato.', 'maria.verdi@example.com', 'maria_verdi'),
(81, 17, 4, 'Bungalow carino e ben tenuto. Spiaggia a pochi passi, ma avrei preferito avere una piscina privata.', 'simona.ferri@example.com', 'simona.ferri'),
(82, 17, 5, 'Esperienza fantastica. Il bungalow è perfetto per un soggiorno tranquillo al mare.', 'luca.bianchi@example.com', 'luca_bianchi'),

(83, 18, 5, 'Casa colonica bellissima e ben ristrutturata. Atmosfera accogliente e rilassante.', 'elena.mancini@example.com', 'elena_mancini'),
(84, 18, 4, 'Rustica e affascinante, ma un po lontana dai servizi. Ottima per chi cerca pace e natura.', 'giorgio.falco@example.com', 'giorgio_falco'),
(85, 18, 5, 'Un angolo di paradiso immerso nel verde. La casa è molto ben tenuta e il soggiorno è stato fantastico.', 'francesco.gori@example.com', 'francesco_gori'),

(86, 19, 5, 'Attico incredibile! Vista mozzafiato e terrazzo fantastico per cene all aperto.', 'martina.bellini@example.com', 'martina_bellini'),
(87, 19, 4, 'Ottimo attico, ma il prezzo è un po elevato per quello che offre. Comunque un soggiorno bellissimo.', 'maria.verdi@example.com', 'maria_verdi'),
(88, 19, 5, 'Posizione centrale e vista spettacolare. Un soggiorno perfetto a Venezia.', 'paolo.marchi@example.com', 'paolo_marchi'),

(89, 20, 4, 'Appartamento elegante e ben posizionato. Perfetto per una visita a Torino, ma avrei preferito un po più di privacy.', 'luigi.rossi@example.com', 'luigi_rossi'),
(90, 20, 5, 'Molto elegante e comodo. Un ottimo soggiorno in una delle città più belle d Italia.', 'elena.mancini@example.com', 'elena_mancini'),
(91, 20, 4, 'Appartamento molto carino, ma rumoroso la notte. Comunque una buona scelta per un soggiorno breve.', 'simona.ferri@example.com', 'simona.ferri');

(92, 21, 4, 'Loft spazioso e ben arredato. Perfetto per un soggiorno di lavoro, ma la zona è un po troppo turistica.', 'giulia.verdi@example.com', 'giulia_verdi'),
(93, 21, 5, 'Perfetto per un soggiorno lungo. Lo spazio è fantastico e ben organizzato. Un ottima scelta.', 'maria.verdi@example.com', 'maria_verdi'),
(94, 21, 4, 'Ottima posizione e bellissimo loft, ma un po caro per le mie tasche.', 'francesco.gori@example.com', 'francesco_gori'),

(95, 22, 5, 'Villa incantevole, ampio giardino e tanta privacy. Un ottima scelta per una vacanza con la famiglia.', 'valentina.ferrari@example.com', 'valentina_ferrari'),
(96, 22, 4, 'Villa spaziosa e ben attrezzata, ma la piscina poteva essere un po più grande.', 'mario.rossi@example.com', 'mario_rossi'),
(97, 22, 5, 'Tutto perfetto. Ottima posizione, tranquillità assoluta e uno splendido giardino.', 'elena.mancini@example.com', 'elena_mancini'),

(98, 23, 4, 'Monolocale centrale ma un po piccolo. Ideale per un soggiorno breve.', 'simona.ferri@example.com', 'simona_ferri'),
(99, 23, 5, 'Comodissimo per visitare la città. Ottima posizione e monolocale ben arredato.', 'giorgio.falco@example.com', 'giorgio_falco'),
(100, 23, 4, 'Buona scelta per un soggiorno breve. La zona è perfetta, ma il monolocale è un po ristretto.', 'luigi.rossi@example.com', 'luigi_rossi'),

(101, 24, 5, 'Attico incredibile! Una vista spettacolare e il design è fantastico. Vale ogni centesimo.', 'francesco.gori@example.com', 'francesco_gori'),
(102, 24, 4, 'Molto bello, ma il costo è un po alto. La vista compensa però tutto.', 'paolo.marchi@example.com', 'paolo_marchi'),
(103, 24, 5, 'Attico elegante e molto ben posizionato. Consigliato per un soggiorno di lusso.', 'martina.bellini@example.com', 'martina_bellini'),

(104, 25, 4, 'Casetta davvero accogliente. Ottima per un weekend in campagna. Avrei preferito un po più di privacy.', 'simona.ferri@example.com', 'simona.ferri'),
(105, 25, 5, 'Perfetta per una fuga tranquilla. Bellissima casetta immersa nel verde.', 'giulia.verdi@example.com', 'giulia_verdi'),
(106, 25, 4, 'Posto molto carino, ma un po distante dai servizi. Comunque una scelta rilassante.', 'maria.verdi@example.com', 'maria_verdi'),

(107, 26, 5, 'Loft industriale davvero originale. Molto spazioso e con un ottimo arredamento.', 'francesco.gori@example.com', 'francesco_gori'),
(108, 26, 4, 'Molto bello e ben posizionato, ma la zona è un po rumorosa durante la notte.', 'giorgio.falco@example.com', 'giorgio_falco'),
(109, 26, 5, 'Perfetto per chi cerca uno stile moderno e unico. Il loft è grande e ben organizzato.', 'elena.mancini@example.com', 'elena_mancini'),

(110, 27, 4, 'Bungalow molto bello, ma un po troppo vicino alla strada. Comunque una buona scelta per un soggiorno tranquillo.', 'mario.rossi@example.com', 'mario_rossi'),
(111, 27, 5, 'Ottima posizione per chi vuole la spiaggia a pochi passi. Il bungalow è perfetto per una vacanza al mare.', 'valentina.ferrari@example.com', 'valentina_ferrari'),
(112, 27, 4, 'Bungalow carino e ben arredato, ma la zona è un po troppo turistica per i miei gusti.', 'luigi.rossi@example.com', 'luigi_rossi'),

(113, 28, 5, 'Casa colonica bellissima, immersa nella natura. L ideale per chi cerca tranquillità.', 'maria.verdi@example.com', 'maria_verdi'),
(114, 28, 4, 'Bellissima casa, ma un po isolata. Ottima per chi cerca il silenzio e la natura.', 'simona.ferri@example.com', 'simona.ferri'),
(115, 28, 5, 'Perfetta per un soggiorno tranquillo lontano dal caos. Un angolo di paradiso.', 'giorgio.falco@example.com', 'giorgio_falco'),

(116, 29, 5, 'Attico elegante, posizione perfetta per visitare la città. Bellissima la terrazza.', 'francesco.gori@example.com', 'francesco_gori'),
(117, 29, 4, 'Molto bello, ma un po costoso. La vista è spettacolare e la posizione eccellente.', 'luigi.rossi@example.com', 'luigi_rossi'),
(118, 29, 5, 'Una delle migliori sistemazioni che abbia mai avuto. Vista panoramica incredibile.', 'paolo.marchi@example.com', 'paolo.marchi'),

(119, 30, 5, 'Appartamento elegante e ben posizionato. Perfetto per una vacanza a Torino.', 'martina.bellini@example.com', 'martina_bellini'),
(120, 30, 4, 'Appartamento carino e accogliente. Molto centrale, ma un po rumoroso di notte.', 'giulia.verdi@example.com', 'giulia_verdi'),
(121, 30, 5, 'Bellissimo appartamento, ottima scelta per una visita a Torino. Confortevole e ben arredato.', 'elena.mancini@example.com', 'elena_mancini');
