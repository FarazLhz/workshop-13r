const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = (credentials = []) => {
    return (req, res, next) => {
        console.log('Authorization-middleware is working');

        //check  for string and allow
        if(typeof credentials === "string") {
            credentials = [credentials];
        }
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).send('Sorry: access was denied');
        } else {
        
        // validating jwt token
        const tokenBody = token.slice(7);
        jwt.verify(tokenBody, config.JWT_SECRETE,(err, decoded) => {
            if(err){
                console.log(`JWT Error : ${err}`);
                return res.status(401).send("Error : Access denied");
            }
            // if there is no error in jwt
            if(credentials.length > 0) {
                if(decoded.scopes && decoded.scopes.length &&
                    credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)) {
                    next();
                } else {
                    return res.status(401).send("Error : Access denied");
                }
            } else {
                // no credential required, user is authorized
                next();
            }
        })
        }
    }
}