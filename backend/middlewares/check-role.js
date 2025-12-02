module.exports = function checkRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(403).json({ message: "Forbidden" });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    };
};