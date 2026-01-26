const accountsService = require('./accounts.service');

async function createAccount(req, res, next) {
    try {
        const result = await accountsService.createAccount(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function listAccounts(req, res, next) {
    try {
        const result = await accountsService.listAccounts();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function updateAccount(req, res, next) {
    try {
        const result = await accountsService.updateAccount(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {
    try {
        const result = await accountsService.deleteAccount(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAccount,
    listAccounts,
    updateAccount,
    deleteAccount
};