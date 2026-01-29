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

async function summary(req, res) {
  return res.json({
    saldo: 3500,
    receitas: 8000,
    despesas: 4500,
    resultado: 3500
  });
}

async function monthly(req, res) {
  return res.json([
    { month: "Jan", receitas: 3000, despesas: 1800 },
    { month: "Fev", receitas: 2500, despesas: 1600 },
    { month: "Mar", receitas: 2000, despesas: 1100 }
  ]);
}

async function byCategory(req, res) {
  return res.json([
    { category: "Aluguel", total: 1500 },
    { category: "Alimentação", total: 1200 },
    { category: "Transporte", total: 800 }
  ]);
}


module.exports = { summary, byCategory, monthly };