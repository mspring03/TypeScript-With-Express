import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: '로그인 되어있지 않음',
        });
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    }

    p.then((decoded) => {
        req.decoded = decoded;
        next();
    })
    .catch(onError)
}

module.exports = authMiddleware;