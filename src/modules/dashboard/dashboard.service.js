const prisma = require('../../prisma');

/**
 * SUMMARY
 * Cards principais do dashboard
 * - Total de receitas
 * - Total de despesas
 * - Saldo
 */
async function summary(userId) {
  const income = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'INCOME'
    },
    _sum: { amount: true }
  });

  const expense = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'EXPENSE'
    },
    _sum: { amount: true }
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  return {
    income: Number(totalIncome),
    expense: Number(totalExpense),
    balance: Number(totalIncome) - Number(totalExpense)
  };
}

/**
 * BY CATEGORY
 * Dados para gráfico de pizza/barra
 */
async function getByCategory(userId, type, month) {
  if (!type) {
    throw new Error('Tipo é obrigatório');
  }

  if (month) {
    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return prisma.$queryRaw`
      SELECT 
        c.name AS category,
        SUM(t.amount) AS total
      FROM transactions t
      JOIN categories c ON c.id = t.category_id
      WHERE t.user_id = ${userId}
        AND t.type::text = ${type}
        AND t.date >= ${start}
        AND t.date < ${end}
      GROUP BY c.name
      ORDER BY total DESC
    `;
  }

  return prisma.$queryRaw`
    SELECT 
      c.name AS category,
      SUM(t.amount) AS total
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE t.user_id = ${userId}
      AND t.type::text = ${type}
    GROUP BY c.name
    ORDER BY total DESC
  `;
}


/**
 * MONTHLY
 * Evolução mensal (gráfico de linha)
 */
async function getMonthly(userId, year) {
  if (!year) {
    throw new Error('Ano é obrigatório');
  }

  const start = new Date(`${year}-01-01`);
  const end = new Date(`${year}-12-31`);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end
      }
    },
    select: {
      type: true,
      amount: true,
      date: true
    }
  });

  // Inicializa os 12 meses
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    income: 0,
    expense: 0
  }));

  transactions.forEach(t => {
    const monthIndex = new Date(t.date).getMonth();

    if (t.type === 'INCOME') {
      months[monthIndex].income += Number(t.amount);
    }

    if (t.type === 'EXPENSE') {
      months[monthIndex].expense += Number(t.amount);
    }
  });

  return months;
}

module.exports = {
  summary,
  getByCategory,
  getMonthly
};