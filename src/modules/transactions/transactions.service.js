const prisma = require("../../prisma");

/* =========================
   CRIAR TRANSAÇÃO
========================= */
async function createTransaction(data) {
  /* =========================
     VALIDAÇÕES BÁSICAS
  ========================= */
  if (!data.type || !data.amount) {
    throw new Error("Tipo e valor são obrigatórios");
  }

  if (Number(data.amount) <= 0) {
    throw new Error("Valor da transação deve ser maior que zero");
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
        },
      });

      if (!category) {
        throw new Error("Categoria inválida");
      }

      if (category.kind !== data.type) {
        throw new Error("Categoria incompatível com o tipo da transação");
      }
    }

    /* =========================
       VALIDA CONTAS (STATUS + DONO)
    ========================= */
    let origin = null;
    let destiny = null;
    const amount = Number(data.amount);

    if (data.accountOriginId) {
      origin = await tx.account.findFirst({
        where: {
          id: data.accountOriginId,
        },
      });

      if (!origin || origin.status !== "ACTIVE") {
        throw new Error(
          "Conta de origem inativa, inexistente ou não pertence ao usuário",
        );
      }
    }

    if (data.accountDestinyId) {
      destiny = await tx.account.findFirst({
        where: {
          id: data.accountDestinyId,
        },
      });

      if (!destiny || destiny.status !== "ACTIVE") {
        throw new Error(
          "Conta de destino inativa, inexistente ou não pertence ao usuário",
        );
      }
    }

    /* =========================
       BLOQUEIA TRANSFER INVÁLIDA
    ========================= */
    if (
      data.type === "TRANSFER" &&
      data.accountOriginId === data.accountDestinyId
    ) {
      throw new Error("Conta de origem e destino não podem ser a mesma");
    }

    /* =========================
       DATA DA TRANSAÇÃO
    ========================= */
    const transactionDate = data.date ? new Date(data.date) : new Date();

    /* =========================
       INCOME (ENTRADA)
    ========================= */
    if (data.type === "INCOME") {
      if (!data.accountDestinyId) {
        throw new Error("Conta de destino é obrigatória para INCOME");
      }

      const transaction = await tx.transaction.create({
        data: {
          type: "INCOME",
          amount: data.amount,
          note: data.note || null,
          categoryId: data.categoryId || null,
          accountDestinyId: data.accountDestinyId,
          date: transactionDate,
          userId: data.userId,
        },
      });

      await tx.account.update({
        where: { id: Number(data.accountDestinyId) },
        data: {
          balance: { increment: amount },
        },
      });

      return transaction;
    }

    /* =========================
       EXPENSE (SAÍDA)
    ========================= */
    if (data.type === "EXPENSE") {
      if (!data.accountOriginId) {
        throw new Error("Conta de origem é obrigatória para EXPENSE");
      }

      // 🔒 opcional: bloquear saldo negativo
      // if (origin.balance < data.amount) {
      //   throw new Error('Saldo insuficiente');
      // }

      const transaction = await tx.transaction.create({
        data: {
          type: "EXPENSE",
          amount: data.amount,
          note: data.note || null,
          categoryId: data.categoryId || null,
          accountOriginId: data.accountOriginId,
          date: transactionDate,
          userId: data.userId,
        },
      });

      await tx.account.update({
        where: { id: data.accountOriginId },
        data: {
          balance: { decrement: data.amount },
        },
      });

      return transaction;
    }

    /* =========================
       TRANSFERÊNCIA
    ========================= */
    if (data.type === "TRANSFER") {
      if (!data.accountOriginId || !data.accountDestinyId) {
        throw new Error(
          "Conta de origem e destino são obrigatórias para TRANSFER",
        );
      }

      // 🔒 opcional: bloquear saldo negativo
      // if (origin.balance < data.amount) {
      //   throw new Error('Saldo insuficiente');
      // }

      const transaction = await tx.transaction.create({
        data: {
          type: "TRANSFER",
          amount: data.amount,
          note: data.note || null,
          accountOriginId: data.accountOriginId,
          accountDestinyId: data.accountDestinyId,
          date: transactionDate,
          userId: data.userId,
        },
      });

      await tx.account.update({
        where: { id: data.accountOriginId },
        data: {
          balance: { decrement: data.amount },
        },
      });

      await tx.account.update({
        where: { id: data.accountDestinyId },
        data: {
          balance: { increment: data.amount },
        },
      });

      return transaction;
    }

    throw new Error("Tipo de transação inválido");
  });
}

/* =========================
   LISTAR TRANSAÇÕES (POR USUÁRIO)
========================= */
async function listTransactions(filters) {
  const { userId, type, day, month, year } = filters;

  const where = {
    userId,
  };

  /* =========================
     FILTRO POR TIPO
  ========================= */
  if (type) {
    where.type = type;
  }

  /* =========================
     FILTRO POR DATA
  ========================= */
  if (day || month || year) {
    let startDate = new Date();
    let endDate = new Date();

    const y = year ? Number(year) : startDate.getFullYear();
    const m = month ? Number(month) - 1 : null;

    if (m !== null) {
      startDate = new Date(y, m, day ? Number(day) : 1, 0, 0, 0);
      endDate = new Date(
        y,
        m,
        day ? Number(day) : 31,
        23,
        59,
        59,
      );
    } else {
      startDate = new Date(y, 0, 1, 0, 0, 0);
      endDate = new Date(y, 11, 31, 23, 59, 59);
    }

    where.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  return prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          kind: true,
        },
      },
      accountOrigin: {
        select: {
          id: true,
          name: true,
        },
      },
      accountDestiny: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function deleteTransaction(transactionId, userId) {
  return prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    const amount = Number(transaction.amount);

    /* =========================
       REVERTER SALDO
    ========================= */
    if (transaction.type === "INCOME") {
      await tx.account.update({
        where: { id: transaction.accountDestinyId },
        data: {
          balance: { decrement: amount },
        },
      });
    }

    if (transaction.type === "EXPENSE") {
      await tx.account.update({
        where: { id: transaction.accountOriginId },
        data: {
          balance: { increment: amount },
        },
      });
    }

    if (transaction.type === "TRANSFER") {
      await tx.account.update({
        where: { id: transaction.accountOriginId },
        data: {
          balance: { increment: amount },
        },
      });

      await tx.account.update({
        where: { id: transaction.accountDestinyId },
        data: {
          balance: { decrement: amount },
        },
      });
    }

    /* =========================
       EXCLUIR TRANSAÇÃO
    ========================= */
    await tx.transaction.delete({
      where: { id: transactionId },
    });

    return true;
  });
}

module.exports = {
  createTransaction,
  listTransactions,
  deleteTransaction
};
