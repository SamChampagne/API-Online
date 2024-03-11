const mysql = require('mysql');
const dotenv = require('dotenv');
const pool = require("../config/db");

dotenv.config();

class Utilisateur {
    static validationCle(cleApi) {
        return new Promise((resolve, reject) => {
            const requete = 'SELECT COUNT(*) AS nbUsager FROM usager u WHERE cle_api = ?; ';
            const parametres = [cleApi];

            pool.query(requete, parametres, (erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                console.log("La clé a marcher : 2");
                resolve(resultat[0].nbUsager > 0);   
            });
        });
    }

    static async AjouterUsager(email, hash, nom) {
        const sql = "INSERT INTO usager(nom, email, mot_de_passe, cle_api) VALUES (?, ?, ?, ?)";
        const cle_api = process.env.CLE_API;
        pool.query(sql, [nom, email, hash, cle_api], (err, results) => {
            if(err){
                console.error('erreur lors de la création de nouveau usager', err);
                return;
            }
            console.log("ajout usager réussie:");
            console.log("Résultat:", results);
        });
    }

    static async Liste() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT nom, email,mot_de_passe, cle_api FROM usager";
            pool.query(sql, [], (err, results) => {
                if (err) {
                    console.error("erreur lors de l'affichage", err);
                    reject(err);
                } else {
                    console.log(JSON.stringify(results));
                    resolve(results);
                }
            });
        });
    }
    static async Recuperation(email, mot_de_passe){
        return new Promise((resolve, reject) => {
            console.log(email + mot_de_passe);
            const sql = "SELECT cle_api FROM usager WHERE email = ? ";
            pool.query(sql, [email, mot_de_passe], (err, results) =>{
                if(err){
                    console.log("Erreur lors de la récupération de la clé")
                    reject(err);
                } else {
                    console.log(results);
                    resolve(results);
                }
            })
        });


    }
}

module.exports = Utilisateur;
