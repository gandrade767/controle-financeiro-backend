const transactionsService = require("./transactions.service");

/* =========================
   CRIAR TRANSAÇÃO
========================= */
async function createTransaction(req, res) {
  try {
    const result = await transactionsService.createTransaction({
      type: req.body.type,
      amount: Number(req.body.amount),
      date: req.body.date,
      note: req.body.note,

      categoryId: req.body.categoryId ? Number(req.body.categoryId) : null,

      accountOriginId: req.body.accountOriginId
        ? Number(req.body.accountOriginId)
        : null,

      accountDestinyId: req.body.accountDestinyId
        ? Number(req.body.accountDestinyId)
        : null,

      userId: Number(req.user.id),
    });

    return res.json(result);
  } catch (err) {
    console.error("❌ ERRO CREATE:", err.message);
    return res.status(400).json({
      error: err.message,
    });
  }
}

/* =========================
   LISTAR TRANSAÇÕES
========================= */
async function listTransactions(req, res) {
  try {
    const userId = Number(req.user.id);

    const filters = {
      userId,
      type: req.query.type || null,
      day: req.query.day || null,
      month: req.query.month || null,
      year: req.query.year || null,
    };

    const result = await transactionsService.listTransactions(filters);
    return res.json(result);
  } catch (err) {
    console.error("❌ ERRO LIST:", err.message);
    return res.status(500).json({
      error: "Erro ao listar transações",
    });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transactionId = Number(req.params.id);
    const userId = Number(req.user.id);

    await transactionsService.deleteTransaction(transactionId, userId);

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ ERRO DELETE:", err.message);
    return res.status(400).json({
      error: err.message,
    });
  }
}

module.exports = {
  createTransaction,
  listTransactions,
  deleteTransaction
};
