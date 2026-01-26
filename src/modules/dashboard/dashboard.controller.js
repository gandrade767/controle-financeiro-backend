const dashboardService = require('./dashboard.service');

async function summary(req, res, next) {
  try {
    const result = await dashboardService.summary(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { summary };