# Documentação - Módulo de Categorias (Categories)

## 📋 Visão Geral

O módulo de categorias permite organizar transações em categorias de receita ou despesa, facilitando a análise e controle de gastos por tipo.

**Localização:** `src/modules/categories/`

## 📁 Estrutura

```
categories/
├── categories.controller.js    # Lógica de requisição/resposta
├── categories.service.js       # Lógica de negócio
└── categories.routes.js        # Definição de rotas
```

## 🔌 Endpoints

### Listar Categorias
**GET** `/api/categories`

Lista todas as categorias disponíveis.

**Query Parameters (Opcionais):**
```
?kind=EXPENSE&page=1&limit=20
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Alimentação",
    "kind": "EXPENSE",
    "createdAt": "2026-01-25T10:00:00Z",
    "updatedAt": "2026-01-25T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Transporte",
    "kind": "EXPENSE",
    "createdAt": "2026-01-25T10:05:00Z",
    "updatedAt": "2026-01-25T10:05:00Z"
  },
  {
    "id": 5,
    "name": "Salário",
    "kind": "INCOME",
    "createdAt": "2026-01-25T10:10:00Z",
    "updatedAt": "2026-01-25T10:10:00Z"
  }
]
```

### Criar Categoria
**POST** `/api/categories`

Cria uma nova categoria.

**Request Body:**
```json
{
  "name": "Lazer",
  "kind": "EXPENSE"
}
```

**Tipos Válidos (kind):**
- `EXPENSE` - Despesa (saída de dinheiro)
- `INCOME` - Receita (entrada de dinheiro)

**Validações:**
- Nome é obrigatório
- Nome deve ser único
- Kind deve ser EXPENSE ou INCOME
- Máximo 100 caracteres no nome

**Response Sucesso (201):**
```json
{
  "id": 10,
  "name": "Lazer",
  "kind": "EXPENSE",
  "createdAt": "2026-01-25T16:00:00Z",
  "updatedAt": "2026-01-25T16:00:00Z"
}
```

### Obter Categoria Específica
**GET** `/api/categories/:id`

Obtém detalhes de uma categoria com suas transações.

**Response (200):**
```json
{
  "id": 1,
  "name": "Alimentação",
  "kind": "EXPENSE",
  "transactionCount": 25,
  "totalAmount": 1250.00,
  "transactions": [
    {
      "id": 101,
      "amount": 50.00,
      "date": "2026-01-25"
    }
  ],
  "createdAt": "2026-01-25T10:00:00Z",
  "updatedAt": "2026-01-25T10:00:00Z"
}
```

### Atualizar Categoria
**PUT** `/api/categories/:id`

Atualiza informações de uma categoria.

**Request Body:**
```json
{
  "name": "Alimentação e Bebidas"
}
```

**Validações:**
- Nome não pode ser duplicado
- Tipo (kind) não pode ser alterado após criação
- Categoria deve ter pelo menos um uso antes de ser protegida

**Response (200):**
```json
{
  "id": 1,
  "name": "Alimentação e Bebidas",
  "kind": "EXPENSE",
  "updatedAt": "2026-01-25T17:00:00Z"
}
```

### Deletar Categoria
**DELETE** `/api/categories/:id`

Remove uma categoria do sistema.

**Validações:**
- Categoria não pode ter transações associadas
- Ou deve redistribuir transações para outra categoria

**Query Parameters (Opcionais):**
```
?transferToId=2  // Transferir transações para categoria 2
```

**Response (200):**
```json
{
  "message": "Categoria deletada com sucesso"
}
```

## 📊 Modelo de Dados

### Category
```
{
  id: Int (ID único)
  name: String (Nome da categoria)
  kind: CategoryKind (EXPENSE | INCOME)
  createdAt: DateTime
  updatedAt: DateTime
  
  Relações:
  - transactions: Transaction[] (Transações da categoria)
  - recurrences: Recurrence[] (Recorrências)
}
```

## 📋 Categorias Pré-configuradas

### Despesas (EXPENSE)
- Alimentação
- Transporte
- Saúde
- Educação
- Entretenimento
- Utilidades/Contas
- Vestuário
- Higiene e Beleza
- Seguros
- Outros

### Receitas (INCOME)
- Salário
- Freelance
- Investimentos
- Bônus
- Presentes
- Outros

## 🧪 Exemplos de Uso

### Criar Categoria de Despesa
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Saúde",
    "kind": "EXPENSE"
  }'
```

### Criar Categoria de Receita
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Consultoria",
    "kind": "INCOME"
  }'
```

### Listar Apenas Despesas
```bash
curl -X GET "http://localhost:3000/api/categories?kind=EXPENSE" \
  -H "Authorization: Bearer <token>"
```

### Listar Apenas Receitas
```bash
curl -X GET "http://localhost:3000/api/categories?kind=INCOME" \
  -H "Authorization: Bearer <token>"
```

### Atualizar Categoria
```bash
curl -X PUT http://localhost:3000/api/categories/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Comida e Bebida"
  }'
```

### Deletar Categoria
```bash
curl -X DELETE http://localhost:3000/api/categories/10 \
  -H "Authorization: Bearer <token>"
```

### Deletar e Transferir Transações
```bash
curl -X DELETE "http://localhost:3000/api/categories/10?transferToId=1" \
  -H "Authorization: Bearer <token>"
```

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Categoria não encontrada" | ID inválido | Verificar ID |
| "Nome já existe" | Nome duplicado | Usar nome diferente |
| "Tipo inválido" | Kind não é EXPENSE ou INCOME | Usar valores válidos |
| "Categoria em uso" | Tem transações associadas | Transferir ou deletar transações primeiro |
| "Campo obrigatório" | Nome não foi enviado | Incluir nome no request |

## 📊 Estatísticas por Categoria

### Total Gasto por Categoria
```bash
GET /api/categories/1/stats
```

**Response:**
```json
{
  "categoryId": 1,
  "name": "Alimentação",
  "kind": "EXPENSE",
  "totalAmount": 1250.50,
  "transactionCount": 25,
  "averagePerTransaction": 50.02,
  "period": {
    "start": "2026-01-01",
    "end": "2026-01-31"
  },
  "monthlyData": [
    {
      "month": "2026-01",
      "amount": 1250.50,
      "count": 25
    }
  ]
}
```

## 🔄 Fluxo de Categorização

```
1. Usuário cria transação
   ↓
2. Seleciona uma categoria
   ↓
3. Sistema vincula transação à categoria
   ↓
4. Dashboard agrega dados por categoria
   ↓
5. Análises e relatórios disponíveis
```

## 🔐 Segurança

- Usuários só veem suas categorias
- Validação de autorização
- Proteção contra categorias duplicadas
- Auditoria de alterações

## 📌 Próximas Implementações Recomendadas

- [ ] Subcategorias
- [ ] Categorias compartilhadas
- [ ] Regras de categorização automática
- [ ] Importação de categorias padrão
- [ ] Ícones personalizados para categorias
- [ ] Limite de gasto por categoria
- [ ] Alertas quando ultrapassar orçamento
- [ ] Análise de tendências por categoria
- [ ] Exportação de relatório por categoria
- [ ] Reordenação de categorias
