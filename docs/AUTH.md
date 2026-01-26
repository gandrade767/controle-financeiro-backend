# Documentação - Módulo de Autenticação (Auth)

## 📋 Visão Geral

O módulo de autenticação é responsável por gerenciar o login de usuários, geração de tokens JWT e validação de sessões.

**Localização:** `src/modules/auth/`

## 📁 Estrutura

```
auth/
├── auth.controller.js    # Lógica de requisição/resposta
├── auth.service.js       # Lógica de negócio
└── auth.routes.js        # Definição de rotas
```

## 🔌 Endpoints

### Login
**POST** `/api/auth/login`

Autentica o usuário com email e senha.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Validações:**
- Email é obrigatório
- Senha é obrigatória
- Email deve existir no banco de dados
- Senha deve corresponder ao hash armazenado

**Response Sucesso (200):**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@email.com"
  },
  "acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Erro:**
```json
{
  "error": "Email ou senha inválidos"
}
```

## 🔐 Segurança

### Hashing de Senhas
- Biblioteca: `bcryptjs`
- Salt rounds: 10
- Função: `bcryptjs.hash(password, 10)`

### Geração de Tokens
```javascript
// Access Token
jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' })

// Refresh Token
jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' })
```

## 📊 Fluxo de Autenticação

```
User Submit Email/Password
        ↓
Validate Input
        ↓
Find User by Email
        ↓
Compare Password with Hash
        ↓
Generate JWT Tokens
        ↓
Return Tokens & User Info
```

## 🧪 Exemplos de Uso

### Teste de Login com cURL
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "senha123"
  }'
```

### Usando o Token Retornado
```bash
curl -X GET http://localhost:3000/api/users/perfil \
  -H "Authorization: Bearer <acessToken>"
```

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Email ou senha inválidos" | Email não existe ou senha errada | Verificar credenciais |
| "Email e senha são obrigatórios" | Campo faltando no request | Enviar email e password |
| "Token inválido ou expirado" | Token expirou ou corrompido | Fazer novo login |

## 🔄 Fluxo de Renovação de Token

Para renovar um token expirado:

```bash
POST /api/auth/refresh
Body: {
  "refreshToken": "<refresh-token>"
}
```

## 📝 Código Fonte

### auth.controller.js
```javascript
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Validação
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email e senha são obrigatórios' 
            });
        }
        
        // Chamar service
        const data = await authService.login(email, password);
        
        // Retornar sucesso
        res.json({
            user: {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
            },
            acessToken: data.accessToken,
            refreshToken: data.refreshToken,
        });
    } catch (err) {
        next(err);
    }
}
```

### Fluxo no Service
1. Buscar usuário por email
2. Comparar senha com hash
3. Gerar tokens JWT
4. Retornar dados do usuário e tokens

## 🔑 Variáveis de Ambiente Necessárias

```env
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d
```

## 📌 Próximas Implementações Recomendadas

- [ ] Implementar endpoint de refresh token
- [ ] Adicionar logout com blacklist de tokens
- [ ] Implementar 2FA (autenticação de dois fatores)
- [ ] Rate limiting para login (proteção contra força bruta)
- [ ] Recuperação de senha
- [ ] Registro de novo usuário (signup)
