exports.login = async (req, res) => {
    const { email, password } = req.body;
    // 1. Cerca utente nel DB
    // 2. Verifica password
    // 3. Controlla se 'isVerified' è true
    res.status(200).json({ token: "JWT_TOKEN_GENERATO" });
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    // Trova utente con questo token e imposta isVerified: true
    res.send("Email verificata con successo!");
};
