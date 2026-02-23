const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../utils/mailer');

// REGISTRAZIONE
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        const newUser = new User({ email, password, verificationToken });
        await newUser.save();

        await mailer.sendVerificationEmail(email, verificationToken);
        res.status(201).json({ message: "Utente creato. Controlla la mail per verificare l'account." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// VERIFICA EMAIL
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });

        if (!user) return res.status(400).json({ error: "Token non valido." });

        user.isVerified = true;
        user.verificationToken = undefined; // Rimuovi il token una volta usato
        await user.save();

        res.send("Email verificata con successo! Ora puoi effettuare il login.");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Credenziali non valide." });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: "Devi prima verificare la tua email." });
        }

        // Generazione Token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
