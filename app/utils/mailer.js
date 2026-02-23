const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Es: smtp.gmail.com
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationEmail = async (userEmail, token) => {
    const url = `http://localhost:3000/auth/verify?token=${token}`;
    await transporter.sendMail({
        to: userEmail,
        subject: "Verifica la tua Email",
        html: `<p>Clicca <a href="${url}">qui</a> per verificare il tuo account.</p>`
    });
};
