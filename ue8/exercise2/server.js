const { Pool } = require('pg');

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const pool = require('./pool.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("EX3: This is a simple database-backed application");
});

app.get("/products", (req, res) => {
	
    const query = {
        text: `SELECT * from products`
    }

    // issue query (returns promise)
    pool.query(query).then(results => {
        resultRows = results.rows;

        // no results
        if (resultRows.length < 1) {
            res.status(401).json({
                "message": "no results"
            });
            return;
        }

        // everything ok -- return results
        let response = {imageIds: resultRows.map(item => item.id)}; // only return the ids
        res.status(200).json(response);

    })
    .catch(error => {
        // error accessing db
        if (error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
        }
    });
});

app.get("/product/:id", (req, res) => {
	
	let id = req.params.id;
	
    const query = {
        text: `SELECT * from products where id=$1`,
        values: [id]
    }

    // issue query (returns promise)
    pool.query(query).then(results => {
        resultRows = results.rows;

        // no results
        if (resultRows.length < 1) {
            res.status(401).json({
                "message": "no results"
            });
            return;
        }

        // everything ok -- return results
        let response = resultRows[0]; // only return one element
        res.status(200).json(response);

    })
    .catch(error => {
        // error accessing db
        if (error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
        }
    });
});

app.put("/product/:id", (req, res) => {
	
	let id = req.params.id;
	
	if (req.body == null) {
		res.status(400).json({
			"message": "body is empty"
		});
		return;
	}
	
	let description = req.body.description;
	
	if (description == null) {
		res.status(400).json({
			"message": "description is empty"
		});
		return;
	}
	
    const query = {
        text: `UPDATE products SET description=$1 where id=$2`,
        values: [description, id]
    }

    // issue query (returns promise)
    pool.query(query).then(results => {

            // results.rowCount: The number of rows processed by the last command.
            affectedRowCount = results.rowCount;

            // no results
            if (affectedRowCount < 1) {
                res.status(404).json({
                    "message": "db entry not found"
                });
                return;
            }

            // everything is ok
            res.status(200).json({
                "message": "update sucessful",
                rowsUpdated: affectedRowCount,
                newDescription: description
			});
	})
    .catch(error => {
        // error accessing db
        if (error) {
            res.status(400).json({
                "message": "error occurred"
            });
            console.log(error.stack);
            return;
        }
    });
});
  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
