const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
//import controllers
const transactionsController = require('./transactions.controller');

// Criar lancamento
router.post('/', auth, transactionsController.createTransaction);

//listar lancamentos
router.get('/', auth,transactionsController.listTransactions);


module.exports = router;