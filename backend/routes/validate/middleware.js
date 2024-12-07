const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config');
const Users = require('../../db');

function authMiddleware(req, res, next) {
    const fullToken = req.headers.authorization;
    if (fullToken && fullToken.startsWith('Bearer')) {

        const token = fullToken.split(' ')[1];
        const id = jwt.verify(token, JWT_SECRET);
        req.userId = id.id;
        next();

    } else {
        
        res.status(403).json({
            msg: "authentication failed"
        })
    }

}

module.exports = authMiddleware;