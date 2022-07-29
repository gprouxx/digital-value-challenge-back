let express = require('express');
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite", err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'db.sqlite'");
});

const GET_ALL_CATEGORIES = "select id, name from categories";

/* Instructions:
 - run "npm start"
 - call localhost:3000/web/v1/categories
*/
router.get('/web/v1/categories', function(req, res, next) {
    db.all(GET_ALL_CATEGORIES, [], (err, categories) => {
        if (err) {
            return console.log(err.message);
        }

        res.send(categories)
    });
});

module.exports = router;
