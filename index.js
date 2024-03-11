const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.json());

// Monter les routes pour /api/pokemons
app.use('/api/pokemons', require('./src/routes/pokemon.route'));
app.use('/api/usager', require('./src/routes/utilisateur.route'));


app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
