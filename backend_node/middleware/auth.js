const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.split(' ')[1]; // Format: 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const secretKey = process.env.JWT_SECRET || '0000';
        const decoded = jwt.verify(token, secretKey);
        // Attach the user information to the request object
        req.user = decoded;
        next(); // Pass control to the next handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
