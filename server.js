const salutations = require('./salutation');
const express = require('express');
const axios = require('axios')
const app = express();
app.use(express.json());

const PORT = 3000;
app.get('/api/chat', async (req, res) => {
    try {
        const urlchat = "https://api.thecatapi.com/v1/images/search";
        const reponse = await axios.get(urlchat);

        //const imgUrl = reponse[0].url;
        console.log(reponse);
        const imgChat = reponse.data[0].url;
        res.send(`<img src="${imgChat}">`);
        
    }
    catch(error) {
        console.error("Erreur lors de la récupération des données:", error);
        res.send("Erreur interne du serveur");
    }

   
})
app.get('/api', (req,res) => {

    const json = {
        message: "Bienvenue sur ma première api"
    }
    const format = `<h1> ${json.message} </h1><script>${JSON.stringify(json)}</script>` ;
    res.send(format);
})

app.get('/api/shawn', (req, res) => {

    const file = '/index.html';
    res.sendFile(__dirname + file);
    
    console.log(file);
})

app.get('/api/calcu', (req, res) => {

    const file = '/calculatrice.html';
    res.sendFile(__dirname + file);
    console.log(file);
})


function getRandomSalutationByLang(codeLangue) {
    // Filtrer les salutations par le code de langue spécifié
    const filteredSalutations = salutations.filter(salutation => salutation.code_langue === codeLangue);

    if (filteredSalutations.length === 0) {
        const randomIndex = Math.floor(Math.random() * salutations.length);
        return salutations[randomIndex];
    }
    
    const randomSalutation = filteredSalutations[Math.floor(Math.random() * filteredSalutations.length)];

    return randomSalutation || { message: "Aucune salutation trouvée pour le code de langue spécifié." };
}

app.get('/api/salutations/', (req, res) => {
    
    
    const codeLangue = req.query.code_langue;

    
    const salutationRandom = getRandomSalutationByLang(codeLangue);

    
    const format = `<h1>${salutationRandom?.message}</h1><script> var lang = ${JSON.stringify(codeLangue)}; </script>`;


    
    res.send(format);
});

app.post('/api/salutation', (req, res) => {
    const message = req.body.message;
    const codeLangue = req.body.code_langue;
    const langue = req.body.langue;

    if (!message) {
        console.log("Le paramètre message est absent");
        return res.status(400).send("Le paramètre message est absent.");
    }

    
    const nouvelleSalutation = {
        code_langue: codeLangue,
        langue: langue,
        message: message
    };

    
    salutations.push(nouvelleSalutation);
    
    console.log("Nouvelle salutation ajoutée :", nouvelleSalutation);

    
    res.status(201).json(nouvelleSalutation);
});

app.get('/api/salutations/liste', (req, res) => {

    res.send(salutations)
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});