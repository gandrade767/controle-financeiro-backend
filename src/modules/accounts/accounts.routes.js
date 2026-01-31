const express = require('express');
const router = express.Router();

const accountsController = require('./accounts.controller');

// Criar conta
router.post('/', accountsController.createAccount);

// Listar contas
router.get('/', accountsController.listAccounts);

// Buscar pelo id
router.get('/:id', accountsController.getAccountById);

// Atualizar conta
router.put('/:id', accountsController.updateAccount);

// Status conta
router.patch("/:id/toggle-status", accountsController.toggleAccountStatus);

// Excluir conta
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;
