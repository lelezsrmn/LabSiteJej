const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Verifying token:', token);
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log('Token verified, user:', verified);
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(400).send('Invalid Token');
    }
};

const verifyAdmin = (req, res, next) => {
    console.log('Verifying admin role for user:', req.user);
    if (req.user.role !== 'admin') {
        console.log('Access denied, user is not admin');
        return res.status(403).send('Access Denied');
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
