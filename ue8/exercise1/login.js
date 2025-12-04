let cfg = require('./config.json')
const express = require('express');
const router = express.Router();

const pool = require('./pool.js');

const jwt = require('jsonwebtoken');

// login route creating/returning a token on successful login
router.post('/', (req, res) => {

    // TODO: get login parameters from request body
    const { user, pass } = req.body;

    // prepare DB query
    const query = {
        text: 'SELECT * FROM users WHERE login = $1 AND password = $2',
        values: [user, pass]
    };

    // issue query (returns promise)
    pool.query(query)
        .then (results => {

			// handle no match (login failed)
            const resultRows = results.rows;
            if (resultRows.length === 0) {
                res.status(401).json({ "message": "login failed" });
                return;
            }

            // everything is ok
            resultUser = resultRows[0];
            
            // /* form the token with userData (accessible when decoding token), jwtkey, expiry time */;
            // We include the login name in the payload so we can identify the user later.
			const token = jwt.sign(
                {
                    userid: resultUser.id,
                    login: resultUser.login
                },
                cfg.auth.jwt_key,
                { expiresIn: cfg.auth.expiration }
            );

            // respond with token
			res.status(200).json({
                "message": "login successfull",
                login: resultUser.login,
                token: token
            });

        })
        .catch(error => {
            // handle error accessing db
            console.error('Error executing query', error.stack);
            res.status(500).json({ "message": "internal server error" });
        });

});

module.exports = router;
