const jwt = require('jsonwebtoken'); 
const User = require('../models/users'); 

module.exports = async function checkAuth(req, res, next) {
    const headers = req.headers;

    const authorizationHeader = headers.authorization ?? headers.Authorization; 

    if (!authorizationHeader) {
        return res.sendstatus(401).json({ message: 'Unauthorized' });
    }

    const [type, token] = authorizationHeader.split(/\s+/);

    if (type !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET ?? "MY_SECRET_KEY"
        );
        const user = await User.findByPk(payload.user_id);

        if (!user) return res.sendstatus(401).json({ message : 'Unauthorized' });

        req.user = user; 
        next();
    } catch {
        return res.sendStatus(401).json({ message: 'Unauthorized' });
    }
}; 