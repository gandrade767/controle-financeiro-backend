const prisma = require('../../prisma');
const bcrypt = require('bcryptjs');

async function createUser(data) {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error('Nome, email e senha são obrigatórios');
  }

  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    throw new Error('Email já cadastrado');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
        name,
        email,
        passwordHash
    },
    select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
    }
  });

  return user;
}


async function listUsers() {
  return { message: 'listUsers ok' };
}

async function updateUser(id, data) {
  const { name, email } = data;

  if (!name || !email) {
    throw new Error('Nome e email são obrigatórios');
  }

  const existing = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: Number(id) }
    }
  });

  if (existing) {
    throw new Error('Email já está em uso');
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      updatedAt: true
    }
  });
}

async function updateStatus(id, status) {
  if (!['ACTIVE', 'INACTIVE'].includes(status)) {
    throw new Error('Status inválido');
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      status: true
    }
  });
}

async function updatePassword(id, data) {
  const { currentPassword, newPassword } = data;  

  if (!currentPassword || !newPassword) {
    throw new Error('Senha atual e nova senha são obrigatórias');
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!valid) {
    throw new Error('Senha atual inválida');
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: Number(id) },
    data: {
      passwordHash: newHash
    }
  });

  return { message: 'Senha atualizada com sucesso' };
}


async function deleteUser(id) {
  return { message: 'deleteUser ok' };
}

module.exports = {
    createUser,
    listUsers,
    updateUser,
    updatePassword,
    updateStatus,
    deleteUser
};