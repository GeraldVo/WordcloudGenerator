const jwt = require('jsonwebtoken');
const jwtSecret = 'my_secret_key';

function authorize(req, res, next) {
    console.log("Authorize");
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.userId = decoded.userId;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

function generateToken(userID) {
    return jwt.sign({ userId: userID }, jwtSecret);

}

module.exports = {
    authorize,
    generateToken
};