let express = require('express');
let router = express.Router();

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db.sqlite", err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'db.sqlite'");
});

const GET_ALL_CATEGORIES = "select * from categories c inner join categories_closure cc on c.id = cc.descendant_id";
const GET_ALL_VOLUMES = "select c1.id, c1.name, round(avg(volume), 0) as volume " +
    "from categories c1 " +
    "inner join categories_closure cc on c1.id = cc.ancestor_id " +
    "inner join categories c2 on c2.id = cc.descendant_id " +
    "inner join volumes v on c2.id = v.category_id " +
    "where date(v.date, '+24 months') > current_date " +
    "group by c1.id, c1.name";

/* Instructions:
 - run "npm start"
 - call localhost:3000/web/v1/categories
*/
router.get('/web/v1/categories', function(req, res, next) {
    db.all(GET_ALL_CATEGORIES, [], (err, categories) => {
        if (err) {
            return console.log(err.message);
        }

        let results = []
        for (const category of categories) {
            if (results.length === 0 || (results.length > 0 && results.map(r => r.id).indexOf(category.id) < 0)) {
                let result = {}
                result.id = category.id
                result.name = category.name
                let ancestors = []
                for (const ancestor of categories) {
                    if (ancestor.ancestor_id !== category.id && category.ancestor_id === ancestor.id) {
                        ancestors.push({id: ancestor.id, name: ancestor.name})
                    }
                }
                result.ancestors = JSON.parse(JSON.stringify(ancestors))
                let children = []
                for (const child of categories) {
                    if (child.descendant_id !== category.id && child.ancestor_id === category.id && child.parent_id === category.id) {
                        children.push({id: child.id, name: child.name})
                    }
                }
                result.children = JSON.parse(JSON.stringify(children))
                results.push(result)
            }
        }

        res.send(results)
    });
});

/* Instructions:
 - run "npm start"
 - call localhost:3000/web/v1/volumes
*/
router.get('/web/v1/volumes', function(req, res, next) {
    db.all(GET_ALL_VOLUMES, [], (err, volumes) => {
        if (err) {
            return console.log(err.message);
        }

        let results = []
        for (const volume of volumes) {
            let result = {}
            let category = {}
            category.id = volume.id
            category.name = volume.name
            result.category = category
            result.averageMonthlyVolume = volume.volume
            results.push(result)
        }

        res.send(results)
    });
});

module.exports = router;
