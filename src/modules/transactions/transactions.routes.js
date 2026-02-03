const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
//import controllers
const transactionsController = require('./transactions.controller');

// Criar lancamento
router.post('/', auth, (req, res, next) => {
  console.log("🔥 ROTA /api/transactions FOI CHAMADA");
  next();
}, transactionsController.createTransaction);

//listar lancamentos
router.get('/', auth,transactionsController.listTransactions);

router.delete("/:id", auth, transactionsController.deleteTransaction);

module.exports = router;