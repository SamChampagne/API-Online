const Utilisateur = require("../models/utilisateur.model");
const bcrypt = require('bcrypt');
const costFactor = 10;

const AjouterUsager = async (req, res, next) => {
    try {
        // Continuer avec le traitement si l'authentification réussit
        const email = req.body.email;
        const mot_de_passe = req.body.mot_de_passe;
        const nom = req.body.nom;
        const hash = await bcrypt.hash(mot_de_passe, costFactor);
        await Utilisateur.AjouterUsager(email, hash, nom);
        res.status(200).json({ message: "Usager ajouté avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};

const Liste = async (req, res) => {
    try {
        const liste = await Utilisateur.Liste(); // Assurez-vous d'appeler la fonction avec await
        res.send(JSON.stringify(liste));
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de la liste d\'usagers.');
    }
};
const Recuperation = async (req, res) => {
    try{
        const email = req.body.email;
        
        const mot_de_passe = req.body.mot_de_passe;
        const hash = await bcrypt.hash(mot_de_passe, costFactor);
        console.log(hash + email);
        const cle_api = await Utilisateur.Recuperation(email, hash);
        res.status(200).json({ message: 'Recuperation de la clé api', cle_api: cle_api });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout de la clé ${cle_api}` });
    };

    
}

module.exports = {
    AjouterUsager,
    Recuperation,
    Liste
}
