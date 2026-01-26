const prisma = require('../../prisma');

async function createAccount(data) {
    // Lógica para criar uma conta
    if (!data.name || !data.type) {
        throw new Error('Nome e tipo da conta são obrigatórios');
    }

    return prisma.account.create({
        data: {
            name: data.name,
            type: data.type,
            initialBalance: data.initialBalance || 0,
            balance: data.balance || 0
        }
    });
}

async function listAccounts() {
    // Lógica para listar contas
    return prisma.account.findMany({
        orderBy: { id: 'asc' }
    });
}

async function updateAccount(id, data) {
    // Lógica para atualizar uma conta
   return prisma.account.update({
        where: { id: Number(id) },
        data: {
            name: data.name,
            type: data.type
        }
    });
}

async function deleteAccount(id) {
    // Lógica para deletar uma conta
    return prisma.account.delete({
        where: { id: Number(id) }
    });
}

module.exports = {
    createAccount,
    listAccounts,
    updateAccount,
    deleteAccount
};