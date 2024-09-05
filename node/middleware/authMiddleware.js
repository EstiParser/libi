import jwt from "jsonwebtoken";
const TOKEN_SECRET = 'your_jwt_secret_key';

function authenticateToken(req, res, next) {    
    const token = req.headers['authorization'];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET); 
        req.user = decoded;
        console.log("Token decoded:", decoded);
        next();
    } catch (err) {
        console.log("Invalid token:", err.message);
        return res.status(401).send("Invalid Token");
    }
}

function authorizeRole(...roles) {
    return (req, res, next) => {
        console.log("User role:", req.user.permission);
        if (!roles.includes(req.user.permission)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

export { authenticateToken, authorizeRole };