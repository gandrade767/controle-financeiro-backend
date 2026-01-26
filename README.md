# Controle Financeiro - Sistema de Gestão de Finanças

Uma API REST completa para gerenciamento de finanças pessoais com suporte a múltiplas contas, categorias, transações e resumos de desempenho.

## 📋 Visão Geral

O **Controle Financeiro** é um sistema backend desenvolvido em Node.js que permite aos usuários gerenciar suas finanças de forma estruturada e segura. O sistema oferece funcionalidades como:

- Autenticação segura com JWT
- Gerenciamento de múltiplas contas bancárias
- Registro e acompanhamento de transações
- Categorização de receitas e despesas
- Dashboard com resumo financeiro
- Controle de recorrências

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM e gerenciador de banco de dados
- **PostgreSQL** - Banco de dados relacional

### Segurança
- **Helmet** - Proteção de headers HTTP
- **CORS** - Controle de compartilhamento de recursos
- **bcryptjs** - Hashing de senhas
- **jsonwebtoken** - Autenticação com JWT
- **express-rate-limit** - Limitação de requisições

### Desenvolvimento
- **Nodemon** - Reinicialização automática em desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Instalação

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL (v12+)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd controle-financeiro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/controle_financeiro"
JWT_SECRET="sua-chave-secreta-muito-segura"
PORT=3000
NODE_ENV=development
```

4. **Execute as migrações do banco de dados**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor**
```bash
npm run dev
```

O servidor iniciará na porta 3000 por padrão.

## 📁 Estrutura do Projeto

```
controle-financeiro/
├── prisma/                    # Configuração do banco de dados
│   ├── schema.prisma         # Schema do banco de dados
│   └── migrations/           # Histórico de migrações
├── src/
│   ├── app.js               # Configuração da aplicação Express
│   ├── server.js            # Entrada principal
│   ├── prisma.js            # Instância do Prisma Client
│   ├── middlewares/         # Middlewares globais
│   │   ├── auth.js         # Autenticação com JWT
│   │   └── errorHandler.js # Tratamento de erros
│   ├── modules/             # Módulos de funcionalidades
│   │   ├── auth/           # Autenticação e login
│   │   ├── accounts/       # Gerenciamento de contas
│   │   ├── transactions/   # Gerenciamento de transações
│   │   ├── categories/     # Gerenciamento de categorias
│   │   ├── users/          # Gerenciamento de usuários
│   │   └── dashboard/      # Resumo financeiro
│   ├── routes/             # Definição de rotas
│   └── utils/              # Funções utilitárias
├── package.json            # Dependências e scripts
└── README.md              # Este arquivo
```

## 🔌 Arquitetura em Camadas

Cada módulo segue o padrão MVC com três camadas:

```
Module (Ex: transactions)
├── transactions.controller.js  # Controladores - Lógica de requisição/resposta
├── transactions.service.js     # Serviços - Lógica de negócio
└── transactions.routes.js      # Rotas - Definição de endpoints
```

### Fluxo de Requisição
1. **Routes** - Define o endpoint
2. **Controller** - Recebe a requisição e valida entrada
3. **Service** - Executa a lógica de negócio
4. **Prisma** - Interage com o banco de dados
5. **Response** - Retorna dados formatados

## 📊 Modelo de Dados

### User (Usuário)
```prisma
- id: Int (PK)
- name: String
- email: String (UNIQUE)
- passwordHash: String
- status: UserStatus (ACTIVE | INACTIVE)
- createdAt: DateTime
- updatedAt: DateTime
```

### Account (Conta Bancária)
```prisma
- id: Int (PK)
- name: String
- type: AccountType (BANK | CASH | CREDIT | DIGITAL)
- initialBalance: Decimal
- balance: Decimal
- createdAt: DateTime
- updatedAt: DateTime
```

### Category (Categoria)
```prisma
- id: Int (PK)
- name: String
- kind: CategoryKind (INCOME | EXPENSE)
- createdAt: DateTime
- updatedAt: DateTime
```

### Transaction (Transação)
```prisma
- id: Int (PK)
- type: TransactionType (INCOME | EXPENSE | TRANSFER)
- amount: Decimal
- date: Date
- note: String (opcional)
- categoryId: Int (FK)
- accountOriginId: Int (FK)
- accountDestinyId: Int (FK)
- userId: Int (FK)
- createdAt: DateTime
- updatedAt: DateTime
```

### Recurrence (Recorrência)
```prisma
- id: Int (PK)
- frequency: String
- nextDate: DateTime
- endDate: DateTime (opcional)
- createdById: Int (FK)
- accountId: Int (FK)
- categoryId: Int (FK)
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação.

### Flow de Autenticação

1. **Login**
   - Endpoint: `POST /api/auth/login`
   - Valida email e senha
   - Retorna `accessToken` e `refreshToken`

2. **Autorização**
   - Adicione o token no header: `Authorization: Bearer <token>`
   - Middleware valida o token
   - Requisição autorizada ou rejeitada

### Middleware de Auth
```javascript
// Aplicado a rotas protegidas
const auth = require('./middlewares/auth');
router.get('/perfil', auth, perfilController);
```

## 📡 API Endpoints

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Realizar login |
| POST | `/api/auth/register` | Criar nova conta |
| POST | `/api/auth/refresh` | Renovar token |

### Contas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/accounts` | Listar todas as contas |
| POST | `/api/accounts` | Criar nova conta |
| GET | `/api/accounts/:id` | Obter detalhes da conta |
| PUT | `/api/accounts/:id` | Atualizar conta |
| DELETE | `/api/accounts/:id` | Deletar conta |

### Transações
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transactions` | Listar transações |
| POST | `/api/transactions` | Criar transação |
| GET | `/api/transactions/:id` | Obter transação específica |
| PUT | `/api/transactions/:id` | Atualizar transação |
| DELETE | `/api/transactions/:id` | Deletar transação |

### Categorias
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/categories` | Listar categorias |
| POST | `/api/categories` | Criar categoria |
| GET | `/api/categories/:id` | Obter categoria |
| PUT | `/api/categories/:id` | Atualizar categoria |
| DELETE | `/api/categories/:id` | Deletar categoria |

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users/perfil` | Obter perfil do usuário |
| PUT | `/api/users/perfil` | Atualizar perfil |
| GET | `/api/users/:id` | Obter usuário específico |

### Dashboard
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/dashboard/summary` | Resumo financeiro |

### Health Check
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Verificar status da API |

## 📝 Exemplos de Uso

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@email.com"
  },
  "acessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2. Criar Conta
```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Conta Corrente",
    "type": "BANK",
    "initialBalance": 1000.00
  }'
```

### 3. Registrar Transação
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "type": "EXPENSE",
    "amount": 50.00,
    "date": "2026-01-25",
    "categoryId": 1,
    "accountOriginId": 1,
    "note": "Compra no supermercado"
  }'
```

### 4. Listar Transações com Filtro
```bash
curl -X GET "http://localhost:3000/api/transactions?type=EXPENSE&startDate=2026-01-01&endDate=2026-01-31" \
  -H "Authorization: Bearer <token>"
```

### 5. Obter Resumo do Dashboard
```bash
curl -X GET http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer <token>"
```

## 🛡️ Segurança

### Boas Práticas Implementadas

1. **Senhas com Hash**
   - Uso de `bcryptjs` com salt rounds
   - Nunca armazenar senhas em texto plano

2. **Validação de entrada**
   - Verificação de campos obrigatórios
   - Sanitização de dados

3. **JWT**
   - Token com expiração
   - Refresh token para renovação
   - Validação em middlewares

4. **Headers de Segurança**
   - Helmet para proteção de headers HTTP
   - CORS configurado corretamente

5. **Taxa de Limitação**
   - Express-rate-limit para prevenir abuso
   - Proteção contra força bruta

6. **Variáveis de Ambiente**
   - Chaves sensíveis não commitadas
   - Arquivo .env no .gitignore

## 🔄 Migrações do Banco de Dados

### Histórico de Migrações

1. **20260125043926_init** - Schema inicial
   - Criação de tabelas base (users, accounts, categories, transactions)

2. **20260126001132_add_user_status** - Adição de status de usuário
   - Campo `status` adicionado à tabela `users`

### Executar Migrações

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações pendentes
npx prisma migrate deploy

# Resetar banco de dados (desenvolvimento)
npx prisma migrate reset
```

## 📊 Tratamento de Erros

O sistema possui tratamento centralizado de erros através do middleware `errorHandler`:

```javascript
// Erros são capturados automaticamente
try {
  // lógica
} catch (err) {
  next(err);  // Passa para o errorHandler
}
```

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 429 | Muitas requisições |
| 500 | Erro interno do servidor |

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento com reinicialização automática
npm run dev

# Produção
npm start

# Atualizar Prisma schema
npx prisma generate

# Abrir Prisma Studio (interface visual do BD)
npx prisma studio
```

## 📝 Variáveis de Ambiente

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/controle_financeiro"

# JWT
JWT_SECRET="sua-chave-secreta-muito-segura"
JWT_EXPIRE="24h"
REFRESH_TOKEN_EXPIRE="7d"

# Servidor
PORT=3000
NODE_ENV=development

# CORS (opcional)
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
```

## 📚 Documentação dos Módulos

### Auth Module
**Localização:** `src/modules/auth/`

Responsável pela autenticação de usuários.

**Funcionalidades:**
- Login com email e senha
- Geração de JWT
- Validação de token

**Arquivos:**
- `auth.controller.js` - Controlador de autenticação
- `auth.service.js` - Lógica de autenticação
- `auth.routes.js` - Rotas de autenticação

### Accounts Module
**Localização:** `src/modules/accounts/`

Gerenciamento de contas bancárias do usuário.

**Funcionalidades:**
- CRUD de contas
- Tipos de contas (Banco, Dinheiro, Crédito, Digital)
- Rastreamento de saldo

### Transactions Module
**Localização:** `src/modules/transactions/`

Gerenciamento de transações financeiras.

**Funcionalidades:**
- Registrar receitas e despesas
- Transferências entre contas
- Filtros por período, tipo e categoria
- Atualização automática de saldos

### Categories Module
**Localização:** `src/modules/categories/`

Gerenciamento de categorias de receitas e despesas.

**Funcionalidades:**
- CRUD de categorias
- Categorização de transações
- Tipos: INCOME (receita) e EXPENSE (despesa)

### Users Module
**Localização:** `src/modules/users/`

Gerenciamento de perfil de usuários.

**Funcionalidades:**
- Atualizar perfil
- Gerenciamento de status
- Consultar informações do usuário

### Dashboard Module
**Localização:** `src/modules/dashboard/`

Resumo e análise de dados financeiros.

**Funcionalidades:**
- Resumo de receitas e despesas
- Balanço total
- Estatísticas por categoria
- Comparativos de períodos

## 🧪 Testes

Para adicionar testes ao projeto, recomenda-se usar:

```bash
npm install --save-dev jest supertest
```

**Exemplo de teste:**
```javascript
const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  test('POST /api/auth/login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@email.com',
        password: 'senha123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('acessToken');
  });
});
```

## 🔍 Troubleshooting

### Erro: "DATABASE_URL não definido"
- Verifique se o arquivo `.env` existe
- Confirme se `DATABASE_URL` está configurado corretamente

### Erro: "Token inválido ou expirado"
- Verifique se o token foi incluído corretamente no header
- Formato: `Authorization: Bearer <token>`
- Confirme se `JWT_SECRET` está correto

### Erro: "Connection refused" ao conectar no PostgreSQL
- Verifique se PostgreSQL está rodando
- Confirme se a URL de conexão está correta
- Valide usuário e senha do banco de dados

### Erro: "UNIQUE constraint failed"
- Verificar se email já existe no banco de dados
- Não é permitido duplicar emails

## 📞 Suporte e Contribuição

Para reportar bugs ou sugerir melhorias:
1. Abra uma issue no repositório
2. Forneça descrição detalhada do problema
3. Inclua passos para reproduzir (se aplicável)

## 📄 Licença

Este projeto está sob a licença ISC.

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado e migrações executadas
- [ ] Senhas e chaves secretas seguras
- [ ] CORS configurado para domínio correto
- [ ] Teste health check (`/health`)
- [ ] Logs configurados
- [ ] Backups do banco de dados
- [ ] HTTPS habilitado em produção

---

**Última atualização:** Janeiro de 2026

**Versão:** 1.0.0
