# Documentação - Módulo de Contas (Accounts)

## 📋 Visão Geral

O módulo de contas gerencia as contas bancárias e de investimento do usuário, permitindo criar, atualizar e deletar contas com rastreamento de saldo.

**Localização:** `src/modules/accounts/`

## 📁 Estrutura

```
accounts/
├── accounts.controller.js    # Lógica de requisição/resposta
├── accounts.service.js       # Lógica de negócio
└── accounts.routes.js        # Definição de rotas
```

## 🔌 Endpoints

### Listar Todas as Contas
**GET** `/api/accounts`

Lista todas as contas do usuário autenticado.

**Headers Obrigatórios:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Conta Corrente",
    "type": "BANK",
    "initialBalance": 1000.00,
    "balance": 950.50,
    "createdAt": "2026-01-25T10:30:00Z",
    "updatedAt": "2026-01-25T15:45:00Z"
  },
  {
    "id": 2,
    "name": "Carteira",
    "type": "CASH",
    "initialBalance": 200.00,
    "balance": 150.75,
    "createdAt": "2026-01-25T10:35:00Z",
    "updatedAt": "2026-01-25T14:20:00Z"
  }
]
```

### Criar Nova Conta
**POST** `/api/accounts`

Cria uma nova conta para o usuário.

**Request Body:**
```json
{
  "name": "Conta Poupança",
  "type": "BANK",
  "initialBalance": 5000.00
}
```

**Tipos de Contas Válidos:**
- `BANK` - Conta bancária
- `CASH` - Dinheiro em espécie
- `CREDIT` - Cartão de crédito
- `DIGITAL` - Carteira digital

**Validações:**
- Nome é obrigatório
- Tipo deve ser um dos valores válidos
- Saldo inicial deve ser ≥ 0

**Response Sucesso (201):**
```json
{
  "id": 3,
  "name": "Conta Poupança",
  "type": "BANK",
  "initialBalance": 5000.00,
  "balance": 5000.00,
  "createdAt": "2026-01-25T16:00:00Z",
  "updatedAt": "2026-01-25T16:00:00Z"
}
```

### Obter Detalhes de Uma Conta
**GET** `/api/accounts/:id`

Obtém informações completas de uma conta específica.

**URL Parameters:**
- `id` - ID da conta (número)

**Response (200):**
```json
{
  "id": 1,
  "name": "Conta Corrente",
  "type": "BANK",
  "initialBalance": 1000.00,
  "balance": 950.50,
  "createdAt": "2026-01-25T10:30:00Z",
  "updatedAt": "2026-01-25T15:45:00Z",
  "transactions": [
    {
      "id": 101,
      "amount": 50.00,
      "type": "EXPENSE",
      "date": "2026-01-25"
    }
  ]
}
```

### Atualizar Conta
**PUT** `/api/accounts/:id`

Atualiza informações de uma conta existente.

**Request Body:**
```json
{
  "name": "Conta Corrente Principal",
  "initialBalance": 1500.00
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Conta Corrente Principal",
  "type": "BANK",
  "initialBalance": 1500.00,
  "balance": 1450.50,
  "updatedAt": "2026-01-25T17:00:00Z"
}
```

### Deletar Conta
**DELETE** `/api/accounts/:id`

Remove uma conta do sistema.

**Validações:**
- Conta não pode ter transações associadas (ou transferir para outra)
- Apenas o proprietário da conta pode deletar

**Response (200):**
```json
{
  "message": "Conta deletada com sucesso"
}
```

## 📊 Modelo de Dados

### Account
```
{
  id: Int (ID único)
  name: String (Nome da conta)
  type: AccountType (BANK | CASH | CREDIT | DIGITAL)
  initialBalance: Decimal (Saldo inicial)
  balance: Decimal (Saldo atual)
  createdAt: DateTime
  updatedAt: DateTime
  
  Relações:
  - originTransactions: Transaction[] (Transações como origem)
  - destinyTransactions: Transaction[] (Transações como destino)
  - recurrences: Recurrence[] (Recorrências)
}
```

## 🔄 Atualização Automática de Saldo

O saldo é atualizado automaticamente quando:

1. **Nova Transação de Saída (EXPENSE)**
   - Saldo reduz pelo valor
   - Exemplo: 1000.00 - 50.00 = 950.00

2. **Nova Transação de Entrada (INCOME)**
   - Saldo aumenta pelo valor
   - Exemplo: 950.00 + 100.00 = 1050.00

3. **Transferência entre Contas (TRANSFER)**
   - Conta origem reduz
   - Conta destino aumenta
   - Exemplo: A: 1000→900, B: 500→600

## 🧪 Exemplos de Uso

### Criar Conta com cURL
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

### Listar Contas
```bash
curl -X GET http://localhost:3000/api/accounts \
  -H "Authorization: Bearer <token>"
```

### Atualizar Conta
```bash
curl -X PUT http://localhost:3000/api/accounts/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Conta Corrente Principal"
  }'
```

### Deletar Conta
```bash
curl -X DELETE http://localhost:3000/api/accounts/1 \
  -H "Authorization: Bearer <token>"
```

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Conta não encontrada" | ID inválido ou não existe | Verificar ID da conta |
| "Acesso negado" | Tentando acessar conta de outro usuário | Usar token de seu usuário |
| "Tipo de conta inválido" | Tipo não é um dos valores válidos | Usar: BANK, CASH, CREDIT ou DIGITAL |
| "Não é possível deletar" | Conta tem transações | Deletar transações primeiro ou transferir |

## 📈 Estatísticas e Filtros

### Filtrar por Tipo
```bash
curl -X GET "http://localhost:3000/api/accounts?type=BANK" \
  -H "Authorization: Bearer <token>"
```

### Filtrar por Status
```bash
curl -X GET "http://localhost:3000/api/accounts?status=ACTIVE" \
  -H "Authorization: Bearer <token>"
```

## 🔐 Segurança

- Usuários só podem ver suas próprias contas
- Validação de autorização em todos os endpoints
- Dados sensíveis não são expostos (senhas, tokens)
- Auditoria de operações críticas (delete, transfer)

## 📌 Próximas Implementações Recomendadas

- [ ] Permitir vincular contas a instituições bancárias reais
- [ ] Sincronização com API de bancos
- [ ] Relatórios de movimentação
- [ ] Alertas de limite de saldo
- [ ] Exportação de extratos
- [ ] Congelamento de contas
- [ ] Histórico de alterações de saldo
