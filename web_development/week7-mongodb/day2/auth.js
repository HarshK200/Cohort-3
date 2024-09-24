const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
    const token = req.headers.authorization;

    const decoded_token = jwt.verify(token, JWT_SECRET);

    if (decoded_token) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}
