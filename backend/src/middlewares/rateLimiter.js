const rateLimit = new Map();

function limiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
    const today = new Date().toDateString();
    const key = `${ip}-${today}`;
    
    const count = rateLimit.get(key) || 0;
    if (count >= 6) {
        return res.status(429).json({ error: "Limite de 6 buscas diárias por IA atingido. Volte amanhã!" });
    }
    rateLimit.set(key, count + 1);
    next();
}

module.exports = limiter;
