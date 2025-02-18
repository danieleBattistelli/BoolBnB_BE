const validateEmailInput = (req, res, next) => {
    const { name, surname, email, phone, subject, text } = req.body;

    if (!name || !surname || !email || !phone || !subject || !text) {
        return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }

    if (name.length < 3 || surname.length < 3) {
        return res.status(400).json({ message: "Nome e cognome devono essere di almeno 3 caratteri"})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email non valida" });
    };

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Numero di telefono non valido" });
    };

    if (phone.length < 8 || phone.length > 10) {
        return res.status(400).json({ message: "Il numero di telefono deve essere compreso tra 8 e 10 numeri"});
    }

    if (subject.length < 3 || subject.length > 50) {
        return res.status(400).json({ message: "L'oggetto deve essere compreso tra 3 e 50 caratteri"});
    };

    if (text.length < 3 || text.length > 500) {
        return res.status(400).json({ message: "Il testo deve essere compreso tra 3 e 500 caratteri" });
    }

    next();
};

export default validateEmailInput;