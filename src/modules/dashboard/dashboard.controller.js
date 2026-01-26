const dashboardService = require('./dashboard.service');

async function summary(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const result = await dashboardService.summary(req.user.id);

    return res.json(result);
  } catch (err) {
    next(err);
  }
}

async function byCategory(req, res, next) {
  try {
    console.log('BY-CATEGORY START', req.query, 'user=', req.user?.id);
    const result = await dashboardService.getByCategory(req.user.id, req.query.type, req.query.month);
    console.log('BY-CATEGORY END', result?.length);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function monthly(req, res, next) {
  try {
    const { year } = req.query;
    const result = await dashboardService.getMonthly(
      req.user.id,
      year
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, byCategory, monthly };