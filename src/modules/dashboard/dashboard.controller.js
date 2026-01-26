const dashboardService = require('./dashboard.service');

async function summary(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // ✅ Agora sim pode usar com segurança
    const result = await dashboardService.summary(req.user.id);

    return res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { summary };
