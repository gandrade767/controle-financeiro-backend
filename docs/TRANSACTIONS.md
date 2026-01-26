# Documentação - Módulo de Transações (Transactions)

## 📋 Visão Geral

O módulo de transações gerencia todas as movimentações financeiras: receitas, despesas e transferências entre contas. Cada transação atualiza automaticamente o saldo das contas envolvidas.

**Localização:** `src/modules/transactions/`

## 📁 Estrutura

```
transactions/
├── transactions.controller.js    # Lógica de requisição/resposta
├── transactions.service.js       # Lógica de negócio
└── transactions.routes.js        # Definição de rotas
```

## 🔌 Endpoints

### Listar Transações
**GET** `/api/transactions`

Lista as transações do usuário com opções de filtro.

**Query Parameters (Opcionais):**
```
?type=EXPENSE&startDate=2026-01-01&endDate=2026-01-31&categoryId=1&accountId=1&page=1&limit=20
```

**Response (200):**
```json
[
  {
    "id": 101,
    "type": "EXPENSE",
    "amount": 50.00,
    "date": "2026-01-25",
    "note": "Compra no supermercado",
    "category": {
      "id": 1,
      "name": "Alimentação",
      "kind": "EXPENSE"
    },
    "accountOrigin": {
      "id": 1,
      "name": "Conta Corrente"
    },
    "createdAt": "2026-01-25T15:30:00Z",
    "updatedAt": "2026-01-25T15:30:00Z"
  }
]
```

### Criar Transação
**POST** `/api/transactions`

Registra uma nova transação.

**Request Body - Despesa/Receita:**
```json
{
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "categoryId": 1,
  "accountOriginId": 1,
  "note": "Compra no supermercado"
}
```

**Request Body - Transferência:**
```json
{
  "type": "TRANSFER",
  "amount": 200.00,
  "date": "2026-01-25",
  "accountOriginId": 1,
  "accountDestinyId": 2,
  "note": "Transferência para poupança"
}
```

**Tipos de Transação:**
- `INCOME` - Receita (entrada de dinheiro)
- `EXPENSE` - Despesa (saída de dinheiro)
- `TRANSFER` - Transferência entre contas

**Validações:**
- Tipo é obrigatório
- Valor deve ser > 0
- Data deve ser válida
- Para EXPENSE/INCOME: categoryId e accountOriginId são obrigatórios
- Para TRANSFER: accountOriginId e accountDestinyId são obrigatórios
- Saldo da conta deve ser suficiente
- Conta de origem diferente de destino (em transfers)

**Response Sucesso (201):**
```json
{
  "id": 101,
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "note": "Compra no supermercado",
  "categoryId": 1,
  "accountOriginId": 1,
  "accountDestinyId": null,
  "userId": 1,
  "createdAt": "2026-01-25T15:30:00Z",
  "updatedAt": "2026-01-25T15:30:00Z"
}
```

### Obter Transação Específica
**GET** `/api/transactions/:id`

Obtém detalhes completos de uma transação.

**Response (200):**
```json
{
  "id": 101,
  "type": "EXPENSE",
  "amount": 50.00,
  "date": "2026-01-25",
  "note": "Compra no supermercado",
  "category": {
    "id": 1,
    "name": "Alimentação",
    "kind": "EXPENSE"
  },
  "accountOrigin": {
    "id": 1,
    "name": "Conta Corrente",
    "balance": 950.50
  },
  "accountDestiny": null,
  "user": {
    "id": 1,
    "name": "João Silva"
  },
  "createdAt": "2026-01-25T15:30:00Z",
  "updatedAt": "2026-01-25T15:30:00Z"
}
```

### Atualizar Transação
**PUT** `/api/transactions/:id`

Atualiza uma transação existente.

**Request Body:**
```json
{
  "amount": 75.00,
  "date": "2026-01-26",
  "categoryId": 2,
  "note": "Compra corrigida no supermercado"
}
```

**Validações:**
- Não pode alterar tipo de transação
- Deve ter saldo suficiente se aumentar valor
- Pode refazer a transação se diminuir valor

**Response (200):**
```json
{
  "id": 101,
  "type": "EXPENSE",
  "amount": 75.00,
  "date": "2026-01-26",
  "note": "Compra corrigida no supermercado",
  "updatedAt": "2026-01-25T16:00:00Z"
}
```

### Deletar Transação
**DELETE** `/api/transactions/:id`

Remove uma transação e reverte o saldo das contas.

**Response (200):**
```json
{
  "message": "Transação deletada com sucesso"
}
```

## 📊 Modelo de Dados

### Transaction
```
{
  id: Int (ID único)
  type: TransactionType (INCOME | EXPENSE | TRANSFER)
  amount: Decimal (Valor da transação)
  date: Date (Data da transação)
  note: String (Observações - opcional)
  
  categoryId: Int (FK para Category - opcional)
  category: Category
  
  accountOriginId: Int (FK para Account)
  accountOrigin: Account
  
  accountDestinyId: Int (FK para Account - opcional)
  accountDestiny: Account
  
  userId: Int (FK para User)
  user: User
  
  createdAt: DateTime
  updatedAt: DateTime
  
  Índices:
  - date (para queries por período)
  - type (para filtrar por tipo)
}
```

## 🔄 Fluxo de Processamento

### Criação de Despesa
```
1. Validar entrada
2. Buscar conta de origem
3. Verificar saldo suficiente
4. Deduzir do saldo
5. Criar registro de transação
6. Retornar sucesso
```

### Criação de Receita
```
1. Validar entrada
2. Buscar conta de destino
3. Adicionar ao saldo
4. Criar registro de transação
5. Retornar sucesso
```

### Criação de Transferência
```
1. Validar entrada
2. Verificar contas diferentes
3. Verificar saldo suficiente na origem
4. Deduzir da conta origem
5. Adicionar na conta destino
6. Criar registro de transação
7. Retornar sucesso
```

## 🧪 Exemplos de Uso

### Registrar Despesa
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

### Registrar Receita
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "type": "INCOME",
    "amount": 3000.00,
    "date": "2026-01-25",
    "categoryId": 5,
    "accountOriginId": 1,
    "note": "Salário do mês"
  }'
```

### Transferência entre Contas
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "type": "TRANSFER",
    "amount": 500.00,
    "date": "2026-01-25",
    "accountOriginId": 1,
    "accountDestinyId": 2,
    "note": "Transferência para poupança"
  }'
```

### Listar Despesas do Mês
```bash
curl -X GET "http://localhost:3000/api/transactions?type=EXPENSE&startDate=2026-01-01&endDate=2026-01-31" \
  -H "Authorization: Bearer <token>"
```

### Listar por Categoria
```bash
curl -X GET "http://localhost:3000/api/transactions?categoryId=1" \
  -H "Authorization: Bearer <token>"
```

### Atualizar Transação
```bash
curl -X PUT http://localhost:3000/api/transactions/101 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "amount": 75.00,
    "note": "Corrigido para valor real"
  }'
```

### Deletar Transação
```bash
curl -X DELETE http://localhost:3000/api/transactions/101 \
  -H "Authorization: Bearer <token>"
```

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Saldo insuficiente" | Conta não tem saldo o suficiente | Verificar saldo ou usar outra conta |
| "Transação não encontrada" | ID inválido | Verificar ID da transação |
| "Categorias diferentes para tipo" | Categoria de receita em despesa | Usar categoria correta |
| "Contas iguais em transferência" | Tentando transferir para mesma conta | Selecionar contas diferentes |
| "Data no futuro" | Data da transação é futura | Usar data presente ou passada |

## 📈 Filtros Disponíveis

```javascript
// Por tipo
GET /api/transactions?type=EXPENSE

// Por período
GET /api/transactions?startDate=2026-01-01&endDate=2026-01-31

// Por categoria
GET /api/transactions?categoryId=1

// Por conta
GET /api/transactions?accountId=1

// Combinado
GET /api/transactions?type=EXPENSE&startDate=2026-01-01&endDate=2026-01-31&categoryId=1

// Com paginação
GET /api/transactions?page=2&limit=50
```

## 🔐 Segurança

- Usuários só podem ver suas transações
- Validação de saldo antes de processar
- Prevenção de valores negativos
- Auditoria de todas as operações
- Transações são imutáveis após período configurável

## 📌 Próximas Implementações Recomendadas

- [ ] Recorrências automáticas de transações
- [ ] Orçamentos por categoria
- [ ] Alertas de limite de gasto
- [ ] Exportação de dados (CSV, PDF)
- [ ] Gráficos e análises
- [ ] Anexação de recibos
- [ ] Conciliação bancária
- [ ] Reversão em lote
- [ ] Etiquetas/tags personalizadas
