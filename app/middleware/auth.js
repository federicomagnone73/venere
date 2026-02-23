const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Recupera il token dall'header Authorization (Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Accesso negato. Token mancante." });
        }

        const token = authHeader.split(' ')[1]; // Prende solo la stringa dopo "Bearer"
        
        // Verifica il token usando il segreto in .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Aggiunge i dati dell'utente decodificati alla richiesta (es. l'ID)
        req.user = decoded;
        
        next(); // Passa al controller successivo
    } catch (err) {
        res.status(401).json({ error: "Token non valido o scaduto." });
    }
};
