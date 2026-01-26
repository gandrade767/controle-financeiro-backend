const prisma = require('../../prisma');

async function createTransaction(data) {

  if (!data.type || !data.amount) {
    throw new Error('Tipo e valor são obrigatórios');
  }

  return prisma.$transaction(async (tx) => {

    // 🔍 VALIDA CATEGORIA
    if (data.categoryId) {
      const category = await tx.category.findUnique({
        where: { id: data.categoryId }
      });

      if (!category) {
        throw new Error('Categoria inválida');
      }

      if (category.kind !== data.type) {
        throw new Error('Categoria incompatível com o tipo da transação');
      }
    }

    // ➕ RECEITA
    if (data.type === 'INCOME') {

      if (!data.accountDestinyId) {
        throw new Error('Conta de destino é obrigatória para transações do tipo INCOME');
      }

      const transaction = await tx.transaction.create({
        data: {
          type: 'INCOME',
          amount: data.amount,
          note: data.note,
          categoryId: data.categoryId || null,
          accountDestinyId: data.accountDestinyId,
          date: new Date(),
          userId: data.userId
        }
      });

      await tx.account.update({
        where: { id: data.accountDestinyId },
        data: {
          balance: { increment: data.amount }
        }
      });

      return transaction;
    }

    // ➖ DESPESA
    if (data.type === 'EXPENSE') {

      if (!data.accountOriginId) {
        throw new Error('Conta de origem é obrigatória para transações do tipo EXPENSE');
      }

      const transaction = await tx.transaction.create({
        data: {
          type: 'EXPENSE',
          amount: data.amount,
          note: data.note,
          categoryId: data.categoryId || null,
          accountOriginId: data.accountOriginId,
          date: new Date(),
          userId: data.userId
        }
      });

      await tx.account.update({
        where: { id: data.accountOriginId },
        data: {
          balance: { decrement: data.amount }
        }
      });

      return transaction;
    }

    // 🔁 TRANSFERÊNCIA
    if (data.type === 'TRANSFER') {

      if (!data.accountOriginId || !data.accountDestinyId) {
        throw new Error('Conta origem e destino são obrigatórias para TRANSFER');
      }

      const transaction = await tx.transaction.create({
        data: {
          type: 'TRANSFER',
          amount: data.amount,
          note: data.note,
          accountOriginId: data.accountOriginId,
          accountDestinyId: data.accountDestinyId,
          date: new Date(),
          userId: data.userId
        }
      });

      await tx.account.update({
        where: { id: data.accountOriginId },
        data: {
          balance: { decrement: data.amount }
        }
      });

      await tx.account.update({
        where: { id: data.accountDestinyId },
        data: {
          balance: { increment: data.amount }
        }
      });

      return transaction;
    }

    throw new Error('Tipo de transação inválido');
  });
}


async function listTransactions() {
  return prisma.transaction.findMany({
    orderBy: {
        date: 'desc'
    },
    include: {
        accountOrigin: {
            select: {
                id: true,
                name: true
            }
        },
        accountDestiny: {
            select: {
                id: true,
                name: true
            }
        },
        user: {
            select: {
                id: true,
                name: true,
                email: true
            }
        }
    }
  });
}

module.exports = {
  createTransaction,
  listTransactions
};