let cfg = require('./config.json')
const jwt = require('jsonwebtoken');

// EX4 TODO:
// - verify token using jwt_key of "secret"
// - set req.userData to the user information stored in the token's payload
module.exports = (req, res, next) => {
		try {
			// get jwt token from Authorization header
			const token = req.headers.authorization.split(" ")[1];
			console.log('Token received:', token);

			//verify token
			const decoded = jwt.verify(token, cfg.auth.jwt_key);
			req.userData = decoded;
			next();
		} catch (error) {
			console.error('Authentication error:', error.message);
			return  res.status(401).json({message: "Authentication failed"});
		}

};
