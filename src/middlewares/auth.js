const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ AQUI ESTÁ O PONTO CRÍTICO
    req.user = {
      id: Number(decoded.id), // ou decoded.userId (veja abaixo)
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};