const authService = require('./auth.service');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        const data = await authService.login(email, password);

        return res.json({
            user: {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { login };