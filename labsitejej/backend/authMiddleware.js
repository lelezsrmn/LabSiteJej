const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access Denied');
    next();
};

module.exports = { verifyToken, verifyAdmin };
