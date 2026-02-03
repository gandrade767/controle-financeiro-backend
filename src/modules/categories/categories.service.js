const { CategoryKind } = require('@prisma/client');
const prisma = require('../../prisma');

async function create({ name, kind }) {
  return prisma.category.create({
    data: {
      name,
      kind,
      active: true
    }
  });
}

async function list(includeInactive = false) {
  return prisma.category.findMany({
    where: {
      ...(includeInactive ? {} : { active: true })
    },
    orderBy: { name: "asc" }
  });
}

async function update(id, data) {
    const { name } = data;

    if (!name) throw new Error('Nome da categoria é obrigatório');

    return prisma.category.update({
        where: { id: Number(id) },
        data: { name }
    });
}

async function toggleActive(id) {
  const category = await prisma.category.findFirst({
    where: { id: Number(id) }
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  return prisma.category.update({
    where: { id: Number(id) },
    data: { active: !category.active }
  });
}

module.exports = {
    create,
    list,
    update,
    toggleActive
};