const { CategoryKind } = require('@prisma/client');
const prisma = require('../../prisma');

async function create(data) {
    const { name, kind } = data;

    if (!name || !kind) {
        throw new Error('Nome e tipo da categoria são obrigatórios');
    }

    if (!['INCOME', 'EXPENSE'].includes(kind)) {
        throw new Error('Tipo da categoria inválido');
    }

    return prisma.category.create({
        data: {
            name,
            kind
        }
    });
}

async function list() {
    return prisma.category.findMany({
        orderBy: { id: 'asc' }
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

module.exports = {
    create,
    list,
    update
};