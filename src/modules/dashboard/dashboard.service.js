const prisma = require('../../prisma');

async function summary(userId) {

    const income = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            type: 'INCOME',
            userId
        }
    });

    const expense = await prisma.transaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            type: 'EXPENSE',
            userId
        }
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
    };
}

module.exports = { summary };