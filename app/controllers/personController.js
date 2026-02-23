// Qui andrebbero le query a MongoDB (es. usando un modello Mongoose)
exports.getAll = async (req, res) => {
    try {
        res.status(200).json({ message: "Lista persone recuperata" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    const { nome, cognome } = req.body;
    res.status(201).json({ message: "Persona creata", data: { nome, cognome } });
};
