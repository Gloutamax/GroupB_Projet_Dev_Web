const evaluatePasswordStrength = (password) => {
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length < 6) {
        return "faible";
    } else if (length >= 6 && !hasNumbers && !hasSymbols) {
        return "moyen";
    } else if (length >= 6 && hasNumbers && !hasSymbols) {
        return "fort";
    } else if (length >= 6 && hasNumbers && hasSymbols) {
        return "très fort";
    }
    return "moyen"; // Cas par défaut
};

module.exports = { evaluatePasswordStrength };
