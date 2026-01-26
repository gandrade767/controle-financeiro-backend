# Documentação - Arquitetura e Desenvolvimento

## 🏗️ Arquitetura do Projeto

### Padrão Arquitetural: MVC (Model-View-Controller)

```
┌─────────────────────────────────────┐
│         Camada de Apresentação      │
│  (Express Routes / Controllers)     │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Camada de Negócio              │
│    (Services / Business Logic)      │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Camada de Dados                │
│    (Prisma / Database Layer)        │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│        PostgreSQL Database          │
│    (Persistent Data Storage)        │
└─────────────────────────────────────┘
```

### Estrutura de Módulos

Cada módulo segue o padrão MVC:

```
module/
├── module.controller.js    # Camada de Apresentação
│   - Recebe requisições HTTP
│   - Valida entrada
│   - Chama service
│   - Retorna resposta
│
├── module.service.js       # Camada de Negócio
│   - Implementa regras de negócio
│   - Chama repositório/Prisma
│   - Trata lógica complexa
│   - Retorna dados processados
│
└── module.routes.js        # Definição de Rotas
    - Define endpoints
    - Aplica middlewares
    - Mapeia rotas para controllers
```

## 🔄 Fluxo de Requisição

```
1. Cliente envia requisição HTTP
   │
2. Express recebe e roteia para controller correto
   │
3. Middleware de autenticação valida token (se necessário)
   │
4. Controller recebe requisição
   ├─ Valida entrada
   ├─ Chama service
   └─ Trata resposta/erro
   │
5. Service executa lógica de negócio
   ├─ Busca dados do Prisma
   ├─ Processa dados
   └─ Retorna resultado
   │
6. Prisma interage com PostgreSQL
   │
7. Dados retornam ao controller
   │
8. Response formatada e enviada ao cliente
```

## 📁 Estrutura de Diretórios

```
controle-financeiro/
│
├── src/
│   ├── app.js                          # Configuração Express
│   ├── server.js                       # Entrada principal
│   ├── prisma.js                       # Instância Prisma
│   │
│   ├── middlewares/
│   │   ├── auth.js                     # Autenticação JWT
│   │   └── errorHandler.js             # Tratamento de erros
│   │
│   ├── modules/
│   │   ├── auth/                       # Módulo de autenticação
│   │   ├── accounts/                   # Módulo de contas
│   │   ├── transactions/               # Módulo de transações
│   │   ├── categories/                 # Módulo de categorias
│   │   ├── users/                      # Módulo de usuários
│   │   └── dashboard/                  # Módulo de dashboard
│   │
│   ├── routes/
│   │   └── index.js                    # Agregador de rotas
│   │
│   └── utils/                          # Funções utilitárias
│
├── prisma/
│   ├── schema.prisma                   # Schema do banco
│   └── migrations/                     # Histórico de migrações
│
├── docs/                               # Documentação
│   ├── AUTH.md
│   ├── ACCOUNTS.md
│   ├── TRANSACTIONS.md
│   ├── CATEGORIES.md
│   ├── DASHBOARD.md
│   ├── INSTALACAO.md
│   └── ARCHITECTURE.md
│
├── .env                                # Variáveis de ambiente
├── .gitignore                          # Arquivos ignorados
├── package.json                        # Dependências
└── README.md                           # Documentação principal
```

## 🔐 Camada de Segurança

### Autenticação
- JWT tokens com expiração
- Middleware validador em todas as rotas protegidas
- Refresh tokens para renovação

### Validação
- Validação de entrada em controllers
- Sanitização de dados
- Tratamento de exceções

### Proteção
- Helmet para headers de segurança
- CORS configurado
- Rate limiting (express-rate-limit)
- Bcrypt para hash de senhas

## 🗄️ Modelo de Dados Relacional

```sql
-- Usuários
users (id, name, email, password_hash, status)

-- Contas
accounts (id, name, type, initial_balance, balance)

-- Categorias
categories (id, name, kind)

-- Transações
transactions (id, type, amount, date, note, 
              category_id, account_origin_id, 
              account_destiny_id, user_id)

-- Recorrências
recurrences (id, frequency, next_date, end_date,
             created_by_id, account_id, category_id)

-- Relacionamentos:
- User 1:N Transactions
- Account 1:N Transactions (origem)
- Account 1:N Transactions (destino)
- Category 1:N Transactions
- User 1:N Recurrences
```

## 🧪 Padrão de Tratamento de Erros

### ErrorHandler Middleware

```javascript
// Centraliza tratamento de erros
app.use((err, req, res, next) => {
    // Log do erro
    console.error(err);
    
    // Retorna resposta padronizada
    res.status(err.status || 500).json({
        error: err.message,
        code: err.code
    });
});
```

### Tipos de Erro

| Código | Tipo | Exemplo |
|--------|------|---------|
| 400 | BadRequest | Validação falhou |
| 401 | Unauthorized | Sem token/token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | NotFound | Recurso não existe |
| 409 | Conflict | Recurso duplicado |
| 500 | ServerError | Erro interno |

## 🔌 Padrão de Resposta

### Resposta de Sucesso
```json
{
  "status": "success",
  "data": { /* dados */ },
  "message": "Operação realizada com sucesso"
}
```

### Resposta de Erro
```json
{
  "status": "error",
  "error": "Descrição do erro",
  "code": "ERROR_CODE"
}
```

## 📝 Convenções de Código

### Nomes de Arquivos
- Controllers: `module.controller.js`
- Services: `module.service.js`
- Routes: `module.routes.js`
- Middlewares: `middleware-name.js`

### Nomes de Funções
- Controllers: `ação` (ex: `login`, `create`, `list`)
- Services: `ação` (ex: `login`, `createAccount`)
- Rotas: método HTTP (GET, POST, etc)

### Nomes de Variáveis
- camelCase para variáveis
- UPPER_CASE para constantes
- snake_case para banco de dados

### Estrutura de Controllers

```javascript
async function nomeAcao(req, res, next) {
  try {
    // 1. Validação
    const { campo1, campo2 } = req.body;
    if (!campo1) {
      return res.status(400).json({ error: 'Obrigatório' });
    }
    
    // 2. Chamar service
    const resultado = await service.nomeAcao(campo1, campo2);
    
    // 3. Retornar resposta
    res.status(201).json(resultado);
  } catch (err) {
    next(err);  // Passa para errorHandler
  }
}

module.exports = { nomeAcao };
```

## 🔄 Ciclo de Desenvolvimento

### 1. Novo Feature
```
1. Criar branch (git checkout -b feature/novo-feature)
2. Implementar controller, service, routes
3. Adicionar validações
4. Testar endpoints
5. Atualizar documentação
6. Commit (git commit -m "feat: descrição")
7. Push (git push origin feature/novo-feature)
8. Pull Request
```

### 2. Bug Fix
```
1. Criar branch (git checkout -b bugfix/nome-bug)
2. Identificar causa
3. Implementar correção
4. Testar
5. Commit (git commit -m "fix: descrição")
6. Push e PR
```

### 3. Refatoração
```
1. Criar branch (git checkout -b refactor/descrição)
2. Melhorar código mantendo funcionalidade
3. Testar
4. Commit (git commit -m "refactor: descrição")
```

## 🧪 Testes

### Estrutura Recomendada

```
tests/
├── unit/
│   ├── auth.service.test.js
│   ├── accounts.service.test.js
│   └── transactions.service.test.js
│
├── integration/
│   ├── auth.routes.test.js
│   ├── accounts.routes.test.js
│   └── transactions.routes.test.js
│
└── fixtures/
    └── mock-data.js
```

### Exemplo de Teste

```javascript
describe('Auth Service', () => {
  test('login com credenciais válidas', async () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'password123';
    
    // Act
    const result = await authService.login(email, password);
    
    // Assert
    expect(result).toHaveProperty('accessToken');
    expect(result.user.email).toBe(email);
  });
  
  test('login com credenciais inválidas', async () => {
    // Arrange
    const email = 'invalid@example.com';
    const password = 'wrong';
    
    // Act & Assert
    expect(() => authService.login(email, password))
      .rejects
      .toThrow('Email ou senha inválidos');
  });
});
```

### Executar Testes

```bash
# Todos os testes
npm test

# Específico
npm test -- auth.service

# Com coverage
npm test -- --coverage

# Em modo watch
npm test -- --watch
```

## 🚀 Performance e Otimizações

### Índices do Banco de Dados
```sql
-- Transações por data (usado em queries)
CREATE INDEX idx_transactions_date ON transactions(date);

-- Transações por tipo (filtragem)
CREATE INDEX idx_transactions_type ON transactions(type);

-- Transações por usuário (isolamento)
CREATE INDEX idx_transactions_user ON transactions(user_id);
```

### Paginação

```javascript
// Query com paginação
const page = req.query.page || 1;
const limit = req.query.limit || 20;
const skip = (page - 1) * limit;

const items = await prisma.transaction.findMany({
  skip,
  take: limit,
  orderBy: { createdAt: 'desc' }
});
```

### Cache

```javascript
// Armazenar em memória (para dados que mudam pouco)
const categoriesCache = new Map();

async function getCategories() {
  if (categoriesCache.size > 0) {
    return categoriesCache;
  }
  
  const categories = await prisma.category.findMany();
  // Popular cache
  return categories;
}
```

## 📊 Logging

### Estrutura de Logs

```javascript
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg, err) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
  debug: (msg) => process.env.NODE_ENV === 'development' && console.debug(`[DEBUG] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`)
};
```

## 🔍 Debugging

### Usar Debugger do Node

```bash
# Iniciar com debugger
node --inspect src/server.js

# No Chrome: chrome://inspect
```

### VS Code Debug (launch.json)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/src/server.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

## 🌐 Variáveis de Ambiente por Ambiente

### Development (.env.development)
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/controle_financeiro
JWT_SECRET=dev-secret-not-secure
PORT=3000
```

### Production (.env.production)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:secure-password@prod-db:5432/controle_financeiro
JWT_SECRET=production-secure-secret-with-32-chars-minimum
PORT=3000
CORS_ORIGIN=https://seu-dominio.com
```

## 📌 Boas Práticas

✅ **Faça:**
- Use async/await
- Valide sempre entrada de usuário
- Trate erros adequadamente
- Use transações para operações críticas
- Documente código complexo
- Faça commits pequenos e atômicos
- Use branch naming conventions
- Revise código antes de merge
- Teste manualmente e automaticamente

❌ **Não faça:**
- Não commite `.env`
- Não use var (use const/let)
- Não deixe código comentado
- Não ignore erros
- Não faça queries N+1
- Não armazene senhas em texto plano
- Não exponha stack traces para usuário
- Não misture business logic com HTTP

## 📚 Recursos Úteis

- [Express.js Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [JWT Guide](https://jwt.io)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
