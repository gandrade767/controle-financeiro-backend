# Documentação - Módulo de Dashboard

## 📋 Visão Geral

O módulo de Dashboard fornece uma visão consolidada das finanças do usuário, com resumos, estatísticas e análises.

**Localização:** `src/modules/dashboard/`

## 📁 Estrutura

```
dashboard/
├── dashboard.controller.js    # Lógica de requisição/resposta
├── dashboard.service.js       # Lógica de negócio e cálculos
└── dashboard.routes.js        # Definição de rotas
```

## 🔌 Endpoints

### Resumo Financeiro
**GET** `/api/dashboard/summary`

Retorna um resumo completo da situação financeira do usuário.

**Query Parameters (Opcionais):**
```
?startDate=2026-01-01&endDate=2026-01-31&period=month
```

**Response (200):**
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
      },
      {
        "id": 2,
        "name": "Carteira",
        "type": "CASH",
        "balance": 150.75
      },
      {
        "id": 3,
        "name": "Poupança",
        "type": "BANK",
        "balance": 4000.00
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
      },
      {
        "id": 2,
        "name": "Transporte",
        "amount": 300.00,
        "percentage": 24,
        "transactionCount": 10
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
  },
  "transactions": {
    "recent": [
      {
        "id": 101,
        "type": "EXPENSE",
        "amount": 50.00,
        "date": "2026-01-25",
        "category": "Alimentação",
        "account": "Conta Corrente"
      }
    ],
    "highest": [
      {
        "id": 1,
        "type": "INCOME",
        "amount": 3500.00,
        "date": "2026-01-01",
        "category": "Salário",
        "account": "Conta Corrente"
      }
    ]
  }
}
```

## 📊 Dados Inclusos no Resumo

### 1. Período (Period)
- Data inicial
- Data final
- Intervalo analisado

### 2. Contas (Accounts)
- Total de contas
- Saldo total em todas as contas
- Lista detalhada de cada conta com saldo

### 3. Resumo (Summary)
- Total de receitas
- Total de despesas
- Saldo final (receitas - despesas)
- Quantidade de transações

### 4. Por Categoria (ByCategory)
**Despesas:**
- Nome da categoria
- Valor total gasto
- Percentual do total
- Quantidade de transações

**Receitas:**
- Nome da categoria
- Valor total recebido
- Percentual do total
- Quantidade de transações

### 5. Transações (Transactions)
**Recentes:**
- Últimas 5 transações
- Informações básicas

**Maior Valores:**
- 5 transações com maior valor
- Informações básicas

## 🧪 Exemplos de Uso

### Resumo do Mês Atual
```bash
curl -X GET http://localhost:3000/api/dashboard/summary \
  -H "Authorization: Bearer <token>"
```

### Resumo de Período Específico
```bash
curl -X GET "http://localhost:3000/api/dashboard/summary?startDate=2026-01-01&endDate=2026-01-31" \
  -H "Authorization: Bearer <token>"
```

### Resumo do Trimestre
```bash
curl -X GET "http://localhost:3000/api/dashboard/summary?period=quarter" \
  -H "Authorization: Bearer <token>"
```

### Resumo do Ano
```bash
curl -X GET "http://localhost:3000/api/dashboard/summary?period=year" \
  -H "Authorization: Bearer <token>"
```

## 📈 Cálculos Realizados

### Balanço
```
Balanço = Receitas - Despesas
```

### Percentual por Categoria
```
Percentual = (Valor Categoria / Total Geral) × 100
```

### Média por Transação
```
Média = Total Gasto / Quantidade de Transações
```

### Taxa de Poupança
```
Taxa Poupança = (Receitas - Despesas) / Receitas × 100
```

## 🔄 Fluxo de Cálculo

```
1. Autenticar usuário
   ↓
2. Buscar período (padrão: mês atual)
   ↓
3. Agregar contas
   ↓
4. Calcular totais (receita/despesa)
   ↓
5. Agrupar por categoria
   ↓
6. Calcular percentuais
   ↓
7. Buscar transações recentes
   ↓
8. Retornar resumo completo
```

## 📊 Tipos de Períodos

| Período | Descrição | Exemplo |
|---------|-----------|---------|
| day | Dia atual | 2026-01-25 |
| week | 7 últimos dias | 2026-01-19 a 2026-01-25 |
| month | Mês atual | 2026-01-01 a 2026-01-31 |
| quarter | Trimestre atual | 2026-01-01 a 2026-03-31 |
| year | Ano atual | 2026-01-01 a 2026-12-31 |
| custom | Personalizado | Com startDate/endDate |

## 💡 Insights Disponíveis

### Total de Receitas
Soma de todas as transações do tipo INCOME

### Total de Despesas
Soma de todas as transações do tipo EXPENSE

### Saldo Líquido
Diferença entre receitas e despesas

### Categoria com Maior Gasto
Categoria que consome mais recursos

### Mês com Maior Gasto
Período com maior movimentação

### Tendência de Gastos
Análise de aumento ou redução ao longo do tempo

## 🔐 Segurança

- Dashboard só mostra dados do usuário autenticado
- Validação de token obrigatória
- Dados consolidados em memória (sem exposição de queries)
- Filtro por período para privacidade

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Sem dados" | Sem transações no período | Registrar transações ou expandir período |
| "Período inválido" | Datas fora da ordem | startDate menor que endDate |
| "Token não fornecido" | Sem autenticação | Incluir token no header |

## 🧮 Exemplo de Cálculo Completo

```
RECEITAS:
- Salário: R$ 3.500,00
Total: R$ 3.500,00

DESPESAS:
- Alimentação: R$ 450,00 (36%)
- Transporte: R$ 300,00 (24%)
- Lazer: R$ 200,00 (16%)
- Outros: R$ 300,00 (24%)
Total: R$ 1.250,00

RESULTADO:
- Balanço: R$ 2.250,00 (64% de poupança)
- Transações: 45
```

## 📌 Próximas Implementações Recomendadas

- [ ] Gráficos de evolução temporal
- [ ] Comparativo período anterior
- [ ] Orçamento vs Realizado
- [ ] Alertas de categorias críticas
- [ ] Previsões com machine learning
- [ ] Exportação de relatórios
- [ ] Análise de padrões de gasto
- [ ] Recomendações de economia
- [ ] Dados detalhados por subcategoria
- [ ] Filtro por tipo de conta
- [ ] Compartilhamento de relatórios
- [ ] Histórico mensal consolidado
