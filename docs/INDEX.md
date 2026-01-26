# 📚 Índice da Documentação

Bem-vindo à documentação completa do **Sistema de Controle Financeiro**!

## 📖 Documentos Principais

### 1. [README.md](../README.md) - Início
Documentação geral do projeto com visão geral, stack tecnológico, instalação básica e exemplos de uso.

**Para quem:** Todos os desenvolvedores iniciando no projeto

---

## 🚀 Guias Rápidos

### 2. [INSTALACAO.md](INSTALACAO.md) - Setup do Ambiente
Guia passo a passo para instalar e configurar o projeto em Windows, macOS e Linux.

**Tópicos:**
- Pré-requisitos
- Instalação em 5 minutos
- Configuração do banco de dados
- Variáveis de ambiente
- Troubleshooting
- Deploy

**Para quem:** Desenvolvedores configurando o ambiente pela primeira vez

---

### 3. [API_REFERENCE.md](API_REFERENCE.md) - Referência Rápida
Referência completa de todos os endpoints da API com exemplos em cURL, JavaScript e Python.

**Inclui:**
- Base URL e autenticação
- Todos os endpoints
- Query parameters
- Request/Response examples
- Códigos de erro
- Exemplos práticos

**Para quem:** Desenvolvedores frontend, testadores, integradores

---

## 📚 Documentação por Módulo

### 4. [AUTH.md](AUTH.md) - Autenticação
Documentação do módulo de autenticação com JWT.

**Tópicos:**
- Login
- Geração de tokens
- Validação de autenticação
- Segurança
- Exemplos de uso

**Para quem:** Desenvolvedores do módulo auth

---

### 5. [ACCOUNTS.md](ACCOUNTS.md) - Gerenciamento de Contas
Documentação do módulo de contas bancárias.

**Tópicos:**
- CRUD de contas
- Tipos de conta
- Rastreamento de saldo
- Atualização automática
- Filtros e buscas

**Para quem:** Desenvolvedores trabalhando com contas

---

### 6. [TRANSACTIONS.md](TRANSACTIONS.md) - Transações
Documentação do módulo de transações (receitas, despesas, transferências).

**Tópicos:**
- Criação de transações
- Tipos de transação
- Atualização de saldo
- Filtros e paginação
- Exemplos práticos

**Para quem:** Desenvolvedores trabalhando com transações

---

### 7. [CATEGORIES.md](CATEGORIES.md) - Categorização
Documentação do módulo de categorias de receita/despesa.

**Tópicos:**
- CRUD de categorias
- Tipos de categoria
- Organização de transações
- Estatísticas por categoria

**Para quem:** Desenvolvedores do módulo de categorias

---

### 8. [DASHBOARD.md](DASHBOARD.md) - Dashboard e Análises
Documentação do resumo financeiro e análises.

**Tópicos:**
- Endpoint de resumo
- Cálculos realizados
- Insights disponíveis
- Períodos suportados
- Exemplos de uso

**Para quem:** Desenvolvedores do frontend, analistas

---

## 🏗️ Documentação Técnica

### 9. [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura e Desenvolvimento
Documentação da arquitetura, padrões e boas práticas.

**Tópicos:**
- Padrão MVC
- Estrutura de diretórios
- Fluxo de requisição
- Tratamento de erros
- Convenções de código
- Testes
- Performance
- Logging
- Debugging

**Para quem:** Arquitetos, desenvolvedores senior, code reviewers

---

## 🗂️ Estrutura da Documentação

```
controle-financeiro/
├── README.md                   # Visão geral e início
├── docs/
│   ├── INDEX.md               # Este arquivo
│   ├── INSTALACAO.md          # Setup do ambiente
│   ├── API_REFERENCE.md       # Referência de endpoints
│   ├── AUTH.md                # Módulo de autenticação
│   ├── ACCOUNTS.md            # Módulo de contas
│   ├── TRANSACTIONS.md        # Módulo de transações
│   ├── CATEGORIES.md          # Módulo de categorias
│   ├── DASHBOARD.md           # Módulo de dashboard
│   └── ARCHITECTURE.md        # Arquitetura e desenvolvimento
└── ...
```

---

## 🎯 Guia de Navegação por Objetivo

### ✅ "Quero começar a desenvolver"
1. Leia [README.md](../README.md) para entender o projeto
2. Siga [INSTALACAO.md](INSTALACAO.md) para configurar o ambiente
3. Leia [ARCHITECTURE.md](ARCHITECTURE.md) para entender a estrutura
4. Consulte [API_REFERENCE.md](API_REFERENCE.md) para conhecer os endpoints

### ✅ "Preciso entender um módulo específico"
- **Auth:** [AUTH.md](AUTH.md)
- **Contas:** [ACCOUNTS.md](ACCOUNTS.md)
- **Transações:** [TRANSACTIONS.md](TRANSACTIONS.md)
- **Categorias:** [CATEGORIES.md](CATEGORIES.md)
- **Dashboard:** [DASHBOARD.md](DASHBOARD.md)

### ✅ "Vou integrar com a API"
1. Comece com [API_REFERENCE.md](API_REFERENCE.md)
2. Veja exemplos com cURL, JavaScript ou Python
3. Teste com Postman ou Insomnia

### ✅ "Preciso fazer deploy"
1. Leia a seção "Deploy" em [INSTALACAO.md](INSTALACAO.md)
2. Configure variáveis de ambiente para produção
3. Execute migrações do banco de dados

### ✅ "Encontrei um bug"
1. Consulte [ARCHITECTURE.md](ARCHITECTURE.md) para entender o fluxo
2. Veja o módulo específico (AUTH, ACCOUNTS, etc)
3. Debugue usando as técnicas em [ARCHITECTURE.md](ARCHITECTURE.md)

### ✅ "Vou fazer code review"
1. Leia [ARCHITECTURE.md](ARCHITECTURE.md) para conhecer os padrões
2. Consulte documentação do módulo relevante
3. Verifique convenções de código

---

## 📊 Mapa Conceitual

```
Sistema de Controle Financeiro
│
├─ Autenticação
│  └─ [AUTH.md](AUTH.md)
│     └─ Login → JWT Tokens
│
├─ Gerenciamento de Dados
│  ├─ Contas [ACCOUNTS.md](ACCOUNTS.md)
│  │  └─ CRUD de contas com tipos
│  ├─ Categorias [CATEGORIES.md](CATEGORIES.md)
│  │  └─ Organização de receitas/despesas
│  └─ Transações [TRANSACTIONS.md](TRANSACTIONS.md)
│     └─ CRUD com atualização de saldo
│
├─ Análises
│  └─ Dashboard [DASHBOARD.md](DASHBOARD.md)
│     └─ Resumo financeiro e insights
│
├─ Arquitetura
│  └─ [ARCHITECTURE.md](ARCHITECTURE.md)
│     └─ MVC, padrões, boas práticas
│
└─ Operações
   └─ [INSTALACAO.md](INSTALACAO.md)
      └─ Setup, deploy, troubleshooting
```

---

## 🔍 Busca Rápida por Termo

### Autenticação
- JWT: [AUTH.md](AUTH.md)
- Login: [AUTH.md](AUTH.md), [API_REFERENCE.md](API_REFERENCE.md#-autenticação-auth)
- Segurança: [AUTH.md](AUTH.md), [ARCHITECTURE.md](ARCHITECTURE.md#-camada-de-segurança)

### API
- Endpoints: [API_REFERENCE.md](API_REFERENCE.md)
- Contas: [ACCOUNTS.md](ACCOUNTS.md), [API_REFERENCE.md](API_REFERENCE.md#-contas-accounts)
- Transações: [TRANSACTIONS.md](TRANSACTIONS.md), [API_REFERENCE.md](API_REFERENCE.md#-transações-transactions)
- Categorias: [CATEGORIES.md](CATEGORIES.md), [API_REFERENCE.md](API_REFERENCE.md#-categorias-categories)

### Banco de Dados
- Schema: [README.md](../README.md#-modelo-de-dados), [ARCHITECTURE.md](ARCHITECTURE.md#-modelo-de-dados-relacional)
- Migrações: [INSTALACAO.md](INSTALACAO.md#-banco-de-dados)
- Prisma: [ARCHITECTURE.md](ARCHITECTURE.md)

### Desenvolvimento
- Estrutura: [ARCHITECTURE.md](ARCHITECTURE.md#-arquitetura-do-projeto)
- Padrões: [ARCHITECTURE.md](ARCHITECTURE.md#-padrão-arquitetural-mvc)
- Testes: [ARCHITECTURE.md](ARCHITECTURE.md#-testes)
- Debugging: [ARCHITECTURE.md](ARCHITECTURE.md#-debugging)

### Deployment
- Instalação: [INSTALACAO.md](INSTALACAO.md)
- Configuração: [INSTALACAO.md](INSTALACAO.md#-variáveis-de-ambiente)
- Produção: [INSTALACAO.md](INSTALACAO.md#-antes-de-produção)

### Troubleshooting
- Problemas: [INSTALACAO.md](INSTALACAO.md#-troubleshooting)
- Erros: [API_REFERENCE.md](API_REFERENCE.md#-códigos-de-erro)

---

## 📚 Leitura Recomendada por Perfil

### 👨‍💻 Desenvolvedor Full Stack (Novo no Projeto)
**Ordem recomendada:**
1. [README.md](../README.md)
2. [INSTALACAO.md](INSTALACAO.md)
3. [ARCHITECTURE.md](ARCHITECTURE.md)
4. [API_REFERENCE.md](API_REFERENCE.md)
5. Módulos específicos conforme necessário

### 🎨 Desenvolvedor Frontend
**Prioridade:**
1. [API_REFERENCE.md](API_REFERENCE.md) ⭐⭐⭐
2. [DASHBOARD.md](DASHBOARD.md)
3. [AUTH.md](AUTH.md)
4. [INSTALACAO.md](INSTALACAO.md#-início-rápido)

### 🔧 Desenvolvedor Backend
**Prioridade:**
1. [ARCHITECTURE.md](ARCHITECTURE.md) ⭐⭐⭐
2. Módulo específico que vai trabalhar
3. [INSTALACAO.md](INSTALACAO.md)
4. [API_REFERENCE.md](API_REFERENCE.md)

### 🧪 QA/Testador
**Prioridade:**
1. [API_REFERENCE.md](API_REFERENCE.md) ⭐⭐⭐
2. [INSTALACAO.md](INSTALACAO.md#-início-rápido)
3. [README.md](../README.md#-exemplos-de-uso)

### 🚀 DevOps/SRE
**Prioridade:**
1. [INSTALACAO.md](INSTALACAO.md#-deploy) ⭐⭐⭐
2. [README.md](../README.md#-variáveis-de-ambiente)
3. [ARCHITECTURE.md](ARCHITECTURE.md#-logging)

### 👔 Gerente/Product Owner
**Leitura:**
1. [README.md](../README.md#-visão-geral) (Visão Geral)
2. [ARCHITECTURE.md](ARCHITECTURE.md#-roadmap) (Próximos passos)
3. [DASHBOARD.md](DASHBOARD.md) (Funcionalidades)

---

## 🔗 Links Úteis Internos

- [Home](../README.md)
- [Stack Tecnológico](../README.md#-stack-tecnológico)
- [Endpoints](API_REFERENCE.md)
- [Exemplos de Uso](../README.md#-exemplos-de-uso)
- [Modelo de Dados](../README.md#-modelo-de-dados)

---

## 📞 Suporte e Contribuição

### Dúvidas?
1. Consulte o documento relevante
2. Use a busca (Ctrl+F / Cmd+F)
3. Abra uma issue no GitHub
4. Contacte o time de desenvolvimento

### Encontrou um erro?
1. Localize o documento
2. Abra um PR com a correção
3. Descreva a mudança

### Quer adicionar documentação?
1. Siga o formato dos documentos existentes
2. Use Markdown
3. Adicione links apropriados
4. Atualize este INDEX

---

**Última atualização:** Janeiro de 2026  
**Versão:** 1.0.0  
**Status:** ✅ Documentação Completa
