const prisma = require('../../prisma');

/* =========================
   CRIAR TRANSAÇÃO
========================= */
async function createTransaction(data) {

  /* =========================
     VALIDAÇÕES BÁSICAS
  ========================= */
  if (!data.type || !data.amount) {
    throw new Error('Tipo e valor são obrigatórios');
  }

  if (Number(data.amount) <= 0) {
    throw new Error('Valor da transação deve ser maior que zero');
  }

  /* =========================
     TRANSAÇÃO ATÔMICA
  ========================= */
  return prisma.$transaction(async (tx) => {

    /* =========================
       VALIDA CATEGORIA (DO USUÁRIO)
    ========================= */
    if (data.categoryId) {
      const category = await tx.category.findFirst({
        where: {
          id: data.categoryId,
          userId: data.userId
        }
      });

      if (!category) {
        throw new Error('Categoria inválida');
      }

      if (category.kind !== data.type) {
        throw new Error('Categoria incompatível com o tipo da transação');
      }
    }

    /* =========================
       VALIDA CONTAS (STATUS + DONO)
    ========================= */
    let origin = null;
    let destiny = null;

    if (data.accountOriginId) {
      origin = await tx.account.findFirst({
        where: {
          id: data.accountOriginId,
          userId: data.userId
        }
      });

      if (!origin || origin.status !== 'ACTIVE') {
        throw new Error('Conta de origem inativa, inexistente ou não pertence ao usuário');
      }
    }

    if (data.accountDestinyId) {
      destiny = await tx.account.findFirst({
        where: {
          id: data.accountDestinyId,
          userId: data.userId
        }
      });

      if (!destiny || destiny.status !== 'ACTIVE') {
        throw new Error('Conta de destino inativa, inexistente ou não pertence ao usuário');
      }
    }

    /* =========================
       BLOQUEIA TRANSFER INVÁLIDA
    ========================= */
    if (
      data.type === 'TRANSFER' &&
      data.accountOriginId === data.accountDestinyId
    ) {
      throw new Error('Conta de origem e destino não podem ser a mesma');
    }

    /* =========================
       DATA DA TRANSAÇÃO
    ========================= */
    const transactionDate = data.date
      ? new Date(data.date)
      : new Date();

    /* =========================
       INCOME (ENTRADA)
    ========================= */
    if (data.type === 'INCOME') {

      if (!data.accountDestinyId) {
        throw new Error('Conta de destino é obrigatória para INCOME');
      }

      const transaction = await tx.transaction.create({
        data: {
          type: 'INCOME',
          amount: data.amount,
          note: data.note || null,
          categoryId: data.categoryId || null,
          accountDestinyId: data.accountDestinyId,
          date: transactionDate,
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

    /* =========================
       EXPENSE (SAÍDA)
    ========================= */
    if (data.type === 'EXPENSE') {

      if (!data.accountOriginId) {
        throw new Error('Conta de origem é obrigatória para EXPENSE');
      }

      // 🔒 opcional: bloquear saldo negativo
      // if (origin.balance < data.amount) {
      //   throw new Error('Saldo insuficiente');
      // }

      const transaction = await tx.transaction.create({
        data: {
          type: 'EXPENSE',
          amount: data.amount,
          note: data.note || null,
          categoryId: data.categoryId || null,
          accountOriginId: data.accountOriginId,
          date: transactionDate,
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

    /* =========================
       TRANSFERÊNCIA
    ========================= */
    if (data.type === 'TRANSFER') {

      if (!data.accountOriginId || !data.accountDestinyId) {
        throw new Error('Conta de origem e destino são obrigatórias para TRANSFER');
      }

      // 🔒 opcional: bloquear saldo negativo
      // if (origin.balance < data.amount) {
      //   throw new Error('Saldo insuficiente');
      // }

      const transaction = await tx.transaction.create({
        data: {
          type: 'TRANSFER',
          amount: data.amount,
          note: data.note || null,
          accountOriginId: data.accountOriginId,
          accountDestinyId: data.accountDestinyId,
          date: transactionDate,
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

/* =========================
   LISTAR TRANSAÇÕES (POR USUÁRIO)
========================= */
async function listTransactions(userId) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
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
      }
    }
  });
}

module.exports = {
  createTransaction,
  listTransactions
};