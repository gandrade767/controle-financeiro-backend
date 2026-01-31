const transactionsService = require('./transactions.service');

async function createTransaction(req, res, next) {
  try {
    const result = await transactionsService.createTransaction({
      ...req.body,
      userId: req.user.id
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function listTransactions(req, res, next) {
  try {
    const result = await transactionsService.listTransactions(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
    createTransaction,
    listTransactions
};