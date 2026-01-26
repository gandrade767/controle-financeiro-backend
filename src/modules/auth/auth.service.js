const prisma = require('../../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Usuário ou senha inválidos');
    }

    if (user.status === 'INACTIVE') {
        throw new Error('Usuário inativo. Contate o administrador.');
    }

    const senhaValida = await bcrypt.compare(password, user.passwordHash);
    if (!senhaValida) {
        throw new Error('Usuário ou senha inválidos');
    }

    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        String(process.env.JWT_SECRET).trim(),
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        String(process.env.JWT_REFRESH_SECRET).trim(),
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    return { accessToken, refreshToken, user };
}

module.exports = { login };
