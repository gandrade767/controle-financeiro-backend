const express = require('express');
const router = express.Router();

const accountsController = require('./accounts.controller');

// Criar conta
router.post('/', accountsController.createAccount);

// Listar contas
router.get('/', accountsController.listAccounts);

// Atualizar conta
router.put('/:id', accountsController.updateAccount);

// Excluir conta
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;
