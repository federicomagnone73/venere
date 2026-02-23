require('dotenv').config();
const express       = require('express');
const mongoose      = require('mongoose');

const authRoutes    = require('./routes/auth');
const personaRoutes = require('./routes/persona');

const app = express();
app.use(express.json()); // Middleware per leggere JSON nel body

// Connessione MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore connessione:', err));

// Utilizzo delle rotte
app.use('/auth', authRoutes);
app.use('/persona', personaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
