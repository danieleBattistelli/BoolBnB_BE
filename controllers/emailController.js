import nodemailer from "nodemailer";

// Oggetto che nodemailer utilizza per inviare email
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
})

// Destinatario fisso
const DESTINATARIO = "info@tuosito.com";

// Funzione che invia l'email
const sendEmail = async (req, res) => {
    const { name, surname, email, phone, subject, text } = req.body;

    try {
        await transporter.sendMail({
            from: `${name} ${surname} <${email}>`,
            to: DESTINATARIO,
            subject: `Richiesta cliente: ${subject}`,
            text: `${text} \n\nMessaggio inviato da ${name} ${surname}, numero di telefono ${phone}`
        });

        res.status(200).json({ message: "Messaggio inviato" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Errore nell'invio dell'email" });
        }
    };

export default sendEmail;