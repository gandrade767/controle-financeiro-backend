# Referência Rápida da API

## 🌐 Base URL
```
http://localhost:3000/api
```

## 🔑 Autenticação
Adicione o header em todas as requisições autenticadas:
```
Authorization: Bearer <seu-token-jwt>
```

---

## 🔐 Autenticação (Auth)

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```
**Response:** 200
```json
{
  "user": { "id": 1, "name": "João", "email": "usuario@email.com" },
  "acessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

---

## 💰 Contas (Accounts)

### Listar Contas
```http
GET /accounts
Authorization: Bearer <token>
```
**Response:** 200
```json
[
  {
    "id": 1,
    "name": "Conta Corrente",
    "type": "BANK",
    "balance": 1000.00,
    "createdAt": "2026-01-25T10:00:00Z"
  }
]
```

### Criar Conta
```http
POST /accounts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Poupança",
  "type": "BANK",
  "initialBalance": 5000.00
}
```
**Response:** 201
```json
{
  "id": 3,
  "name": "Poupança",
  "type": "BANK",
  "initialBalance": 5000.00,
  "balance": 5000.00
}
```

### Obter Conta
```http
GET /accounts/1
Authorization: Bearer <token>
```
**Response:** 200
```json
{
  "id": 1,
  "name": "Conta Corrente",
  "type": "BANK",
  "balance": 1000.00,
  "createdAt": "2026-01-25T10:00:00Z"
}
```

### Atualizar Conta
```http
PUT /accounts/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Conta Corrente Principal"
}
```
**Response:** 200
```json
{
  "id": 1,
  "name": "Conta Corrente Principal",
  "type": "BANK",
  "balance": 1000.00
}
```

### Deletar Conta
```http
DELETE /accounts/1
Authorization: Bearer <token>
```
**Response:** 200
```json
{ "message": "Conta deletada com sucesso" }
```

---

## 📊 Transações (Transactions)

### Listar Transações
```http
GET /transactions?type=EXPENSE&startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <token>
```
**Query Params Opcionais:**
- `type`: INCOME, EXPENSE, TRANSFER
- `categoryId`: ID da categoria
- `accountId`: ID da conta
- `startDate`: Data inicial (YYYY-MM-DD)
- `endDate`: Data final (YYYY-MM-DD)
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 20)

**Response:** 200
```json
[
  {
    "id": 101,
    "type": "EXPENSE",
    "amount": 50.00,
    "date": "2026-01-25",
    "note": "Supermercado",
    "category": { "id": 1, "name": "Alimentação" },
    "accountOrigin": { "id": 1, "name": "Conta Corrente" }
  }
]
```

### Criar Transação (Despesa/Receita)
```http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "categoryId": 1,
  "accountOriginId": 1,
  "note": "Compra no supermercado"
}
```
**Response:** 201
```json
{
  "id": 101,
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "note": "Compra no supermercado",
  "categoryId": 1,
  "accountOriginId": 1
}
```

### Criar Transação (Transferência)
```http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "TRANSFER",
  "amount": 500.00,
  "date": "2026-01-25",
  "accountOriginId": 1,
  "accountDestinyId": 2,
  "note": "Transferência para poupança"
}
```
**Response:** 201

### Obter Transação
```http
GET /transactions/101
Authorization: Bearer <token>
```
**Response:** 200
```json
{
  "id": 101,
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "category": { "id": 1, "name": "Alimentação" },
  "accountOrigin": { "id": 1, "name": "Conta Corrente" },
  "createdAt": "2026-01-25T15:30:00Z"
}
```

### Atualizar Transação
```http
PUT /transactions/101
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 75.00,
  "note": "Corrigido"
}
```
**Response:** 200

### Deletar Transação
```http
DELETE /transactions/101
Authorization: Bearer <token>
```
**Response:** 200
```json
{ "message": "Transação deletada com sucesso" }
```

---

## 🏷️ Categorias (Categories)

### Listar Categorias
```http
GET /categories?kind=EXPENSE
Authorization: Bearer <token>
```
**Query Params:**
- `kind`: EXPENSE ou INCOME

**Response:** 200
```json
[
  {
    "id": 1,
    "name": "Alimentação",
    "kind": "EXPENSE",
    "createdAt": "2026-01-25T10:00:00Z"
  }
]
```

### Criar Categoria
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Lazer",
  "kind": "EXPENSE"
}
```
**Response:** 201
```json
{
  "id": 10,
  "name": "Lazer",
  "kind": "EXPENSE",
  "createdAt": "2026-01-25T16:00:00Z"
}
```

### Obter Categoria
```http
GET /categories/1
Authorization: Bearer <token>
```
**Response:** 200
```json
{
  "id": 1,
  "name": "Alimentação",
  "kind": "EXPENSE",
  "transactionCount": 25,
  "totalAmount": 1250.00
}
```

### Atualizar Categoria
```http
PUT /categories/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Comida e Bebida"
}
```
**Response:** 200

### Deletar Categoria
```http
DELETE /categories/1
Authorization: Bearer <token>
```
**Response:** 200
```json
{ "message": "Categoria deletada com sucesso" }
```

---

## 📈 Dashboard

### Resumo Financeiro
```http
GET /dashboard/summary?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <token>
```
**Query Params Opcionais:**
- `startDate`: Data inicial (padrão: 1º dia do mês)
- `endDate`: Data final (padrão: hoje)
- `period`: day, week, month, quarter, year

**Response:** 200
```json
{
  "period": {
    "start": "2026-01-01",
    "end": "2026-01-31"
  },
  "accounts": {
    "total": 3,
    "totalBalance": 5100.75,
    "accounts": [
      {
        "id": 1,
        "name": "Conta Corrente",
        "type": "BANK",
        "balance": 950.50
      }
    ]
  },
  "summary": {
    "totalIncome": 3500.00,
    "totalExpense": 1250.50,
    "balance": 2249.50,
    "transactionCount": 45
  },
  "byCategory": {
    "expense": [
      {
        "id": 1,
        "name": "Alimentação",
        "amount": 450.00,
        "percentage": 36,
        "transactionCount": 15
      }
    ],
    "income": [
      {
        "id": 5,
        "name": "Salário",
        "amount": 3500.00,
        "percentage": 100,
        "transactionCount": 1
      }
    ]
  }
}
```

---

## 👤 Usuários (Users)

### Obter Perfil
```http
GET /users/perfil
Authorization: Bearer <token>
```
**Response:** 200
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "status": "ACTIVE",
  "createdAt": "2026-01-25T10:00:00Z"
}
```

### Atualizar Perfil
```http
PUT /users/perfil
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Santos"
}
```
**Response:** 200
```json
{
  "id": 1,
  "name": "João Silva Santos",
  "email": "joao@email.com",
  "updatedAt": "2026-01-25T17:00:00Z"
}
```

---

## ✅ Health Check

### Verificar Status da API
```http
GET /health
```
**Response:** 200
```json
{
  "status": "ok",
  "time": "2026-01-25T15:30:00Z"
}
```

---

## ❌ Códigos de Erro

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Sucesso |
| 201 | Created | Recurso criado |
| 400 | Bad Request | Requisição inválida |
| 401 | Unauthorized | Não autenticado |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Recurso duplicado |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Server Error | Erro interno |

---

## 📝 Formatos de Data

- **ISO 8601:** `2026-01-25T15:30:00Z`
- **Data:** `2026-01-25`
- **Hora:** `15:30:00`

---

## 💵 Formato de Valores Monetários

- **Tipo:** Decimal com até 2 casas
- **Exemplo:** `1250.50`, `100.00`, `0.99`
- **Mínimo:** `0.01`
- **Máximo:** Limitado pelo banco de dados

---

## 🔗 Tipos de Enum

### AccountType
- `BANK` - Conta bancária
- `CASH` - Dinheiro em espécie
- `CREDIT` - Cartão de crédito
- `DIGITAL` - Carteira digital

### TransactionType
- `INCOME` - Receita
- `EXPENSE` - Despesa
- `TRANSFER` - Transferência

### CategoryKind
- `INCOME` - Receita
- `EXPENSE` - Despesa

### UserStatus
- `ACTIVE` - Usuário ativo
- `INACTIVE` - Usuário inativo

---

## 🛠️ Exemplo com cURL

### Login e Armazenar Token
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123"
  }' | jq -r '.acessToken')

# Usar token
curl -X GET http://localhost:3000/api/accounts \
  -H "Authorization: Bearer $TOKEN"
```

### Criar Transação Completa
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "type": "EXPENSE",
    "amount": 50.00,
    "date": "2026-01-25",
    "categoryId": 1,
    "accountOriginId": 1,
    "note": "Supermercado"
  }'
```

---

## 📊 Exemplo com JavaScript/Fetch

```javascript
const API_URL = 'http://localhost:3000/api';
let token = null;

// Login
async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  token = data.acessToken;
  return data;
}

// Listar contas
async function getAccounts() {
  const res = await fetch(`${API_URL}/accounts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

// Criar transação
async function createTransaction(transaction) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transaction)
  });
  return res.json();
}

// Usar
await login('usuario@email.com', 'senha123');
const accounts = await getAccounts();
await createTransaction({
  type: 'EXPENSE',
  amount: 50,
  date: '2026-01-25',
  categoryId: 1,
  accountOriginId: 1,
  note: 'Supermercado'
});
```

---

## 🐍 Exemplo com Python/Requests

```python
import requests
import json

API_URL = 'http://localhost:3000/api'
token = None

def login(email, password):
    global token
    res = requests.post(f'{API_URL}/auth/login', json={
        'email': email,
        'password': password
    })
    data = res.json()
    token = data['acessToken']
    return data

def get_accounts():
    res = requests.get(f'{API_URL}/accounts', headers={
        'Authorization': f'Bearer {token}'
    })
    return res.json()

def create_transaction(transaction):
    res = requests.post(f'{API_URL}/transactions',
        json=transaction,
        headers={'Authorization': f'Bearer {token}'}
    )
    return res.json()

# Usar
login('usuario@email.com', 'senha123')
accounts = get_accounts()
create_transaction({
    'type': 'EXPENSE',
    'amount': 50.0,
    'date': '2026-01-25',
    'categoryId': 1,
    'accountOriginId': 1,
    'note': 'Supermercado'
})
```

---

**Última atualização:** Janeiro de 2026  
**Versão da API:** 1.0.0
