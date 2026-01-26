# 🤝 Guia de Contribuição e Padrões

## 📋 Tabela de Conteúdo
1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Padrões de Código](#padrões-de-código)
4. [Padrões de Git](#padrões-de-git)
5. [Processo de Review](#processo-de-review)
6. [Checklist de Deploy](#checklist-de-deploy)

---

## 💼 Código de Conduta

Somos comprometidos em fornecer um ambiente acolhedor e inclusivo para todos.

### Esperado:
✅ Respeito mútuo  
✅ Comunicação clara  
✅ Colaboração  
✅ Qualidade de código  
✅ Documentação adequada  

### Não é permitido:
❌ Assédio  
❌ Discriminação  
❌ Linguagem ofensiva  
❌ Código sem testes  
❌ Commits sem mensagens claras  

---

## 🚀 Como Contribuir

### 1. Setup Inicial

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd controle-financeiro

# Crie sua branch
git checkout -b feature/sua-feature
# ou
git checkout -b bugfix/seu-bug
```

### 2. Desenvolva

```bash
# Instale dependências
npm install

# Configure ambiente
cp .env.example .env

# Inicie servidor em desenvolvimento
npm run dev
```

### 3. Teste Localmente

```bash
# Rode testes
npm test

# Verifique formatação
npm run lint

# Teste manualmente os endpoints
# Use Postman ou Insomnia
```

### 4. Commit e Push

```bash
# Adicione arquivos
git add .

# Faça commit com mensagem descritiva
git commit -m "feat: adiciona nova funcionalidade"

# Push para seu branch
git push origin feature/sua-feature
```

### 5. Abra um Pull Request

- Vá para o repositório
- Clique em "Pull Request"
- Descreva sua mudança
- Adicione prints se relevante
- Aguarde revisão

### 6. Code Review

- Responda aos comentários
- Faça ajustes solicitados
- Após aprovação, sua PR será merged

---

## 📐 Padrões de Código

### Estrutura de Arquivo

```javascript
// Imports ordenados por grupo
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Constantes
const DEFAULT_LIMIT = 20;

// Controllers
async function nomeAcao(req, res, next) {
  try {
    // corpo
  } catch (err) {
    next(err);
  }
}

// Exports
module.exports = { nomeAcao };
```

### Nomes de Variáveis

```javascript
// ✅ BOM
const userEmail = req.body.email;
const isActive = user.status === 'ACTIVE';
const transactionList = [];
const MAX_RETRIES = 3;

// ❌ RUIM
const e = req.body.email;
const a = user.status === 'ACTIVE';
const list = [];
const max_retries = 3;
```

### Funções

```javascript
// ✅ BOM - Descritivo e com validação
async function getUserById(userId) {
  if (!userId || typeof userId !== 'number') {
    throw new Error('userId inválido');
  }
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  return user;
}

// ❌ RUIM - Sem validação
async function getUser(id) {
  return prisma.user.findUnique({ where: { id } });
}
```

### Tratamento de Erros

```javascript
// ✅ BOM
async function processTransaction(data) {
  try {
    // validação
    if (!data.amount || data.amount <= 0) {
      throw new Error('Valor deve ser maior que 0');
    }
    
    // processamento
    const result = await service.process(data);
    
    return result;
  } catch (err) {
    // Log do erro
    console.error('Erro ao processar transação:', err);
    
    // Re-throw com contexto
    throw new Error(`Falha no processamento: ${err.message}`);
  }
}

// ❌ RUIM - Erro silencioso
async function processTransaction(data) {
  const result = await service.process(data);
  return result;
}
```

### Async/Await

```javascript
// ✅ BOM
async function createTransaction(req, res, next) {
  try {
    const data = req.body;
    const transaction = await service.create(data);
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
}

// ❌ RUIM - Callbacks
function createTransaction(req, res, next) {
  service.create(req.body, (err, transaction) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json(transaction);
    }
  });
}
```

### Comentários

```javascript
// ✅ BOM - Explica o POR QUÊ
// Utilizamos limit maior aqui porque a query é pesada
// e queremos evitar N+1 queries
const users = await prisma.user.findMany({
  take: 100,
  include: { transactions: true }
});

// ❌ RUIM - Óbvio demais
// Obtém usuários
const users = await prisma.user.findMany();

// ❌ RUIM - Muito longo
/*
Função que processa transação com validação de saldo
e atualização de conta. Primeiro valida se o usuário
existe, depois valida o saldo, depois cria a transação
e por fim atualiza o saldo da conta.
*/
async function processTransaction(data) {
  // ...
}
```

### Strings

```javascript
// ✅ BOM - Template literals
const message = `Transação criada: ${transactionId}`;
const query = `SELECT * FROM transactions WHERE id = ${id}`;

// ❌ RUIM - Concatenação
const message = 'Transação criada: ' + transactionId;
const query = 'SELECT * FROM transactions WHERE id = ' + id;
```

---

## 🌳 Padrões de Git

### Nomes de Branch

```bash
# Feature nova
feature/nome-da-feature

# Bug fix
bugfix/nome-do-bug

# Refatoração
refactor/nome-da-refatoracao

# Hotfix urgente
hotfix/nome-do-hotfix

# Exemplo:
feature/adicionar-filtro-data
bugfix/corrigir-saldo-negativo
refactor/melhorar-performance-dashboard
hotfix/corrigir-login-crash
```

### Mensagens de Commit

```bash
# Formato: <tipo>: <assunto>
# <tipo>: feat, fix, refactor, docs, test, chore, perf, style

# Exemplo de BOM commit
git commit -m "feat: adicionar filtro de data em transações"
git commit -m "fix: corrigir cálculo de saldo negativo"
git commit -m "refactor: melhorar performance do dashboard"
git commit -m "docs: adicionar exemplos de uso da API"
git commit -m "test: adicionar testes para auth service"

# Exemplo de RUIM commit
git commit -m "mudanças"
git commit -m "fix bug"
git commit -m "Updates"
```

### Anatomia de um Bom Commit

```
feat: adicionar autenticação com email

Esta mudança adiciona suporte para login usando email
e senha. Implementa JWT para autenticação e adiciona
middleware de validação de token.

- Adiciona rota POST /auth/login
- Implementa hashings de senha com bcryptjs
- Cria middleware de autenticação
- Adiciona testes para auth service

Fixes #123
Relates to #456
```

### Rebase e Merge

```bash
# Antes de fazer PR, faça rebase na main
git fetch origin
git rebase origin/main

# Se houver conflitos, resolva e continue
git add .
git rebase --continue

# Force push (cuidado!)
git push origin feature/sua-feature --force-with-lease
```

---

## 👀 Processo de Review

### Como Submeter um PR

1. **Descrição Clara**
   - Qual é a mudança?
   - Por que é necessária?
   - Como foi testado?

2. **Referências**
   - Adicione links para issues
   - Mencione relacionados

3. **Teste Antes**
   - Execute `npm test`
   - Teste manualmente
   - Verifique formatação

### Checklist antes de Submeter

- [ ] Código segue padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Sem conflitos com main
- [ ] Sem console.log ou debugger
- [ ] Mensagens de commit são claras
- [ ] Não há arquivos desnecessários commitados

### Como Fazer Code Review

```javascript
// ✅ Feedback construtivo
// Ótima implementação! Apenas uma sugestão:
// Podemos usar a function nativa ao invés de map?
const ids = users.map(u => u.id);
// Melhor seria:
const ids = users.flatMap(u => u.id);

// ❌ Feedback não construtivo
// Isso está errado
// Péssimo código
```

### Respondendo a Revisão

1. Agradeça o feedback
2. Faça as correções
3. Responda aos comentários
4. Re-requira revisão

---

## ✅ Checklist de Deploy

### Pré-Deploy

- [ ] Todos os testes passando
- [ ] Sem warnings no build
- [ ] Documentação atualizada
- [ ] Variáveis de ambiente revisadas
- [ ] Backup do banco de dados
- [ ] Plano de rollback pronto

### Segurança

- [ ] JWT_SECRET atualizado
- [ ] CORS configurado corretamente
- [ ] Rate limiting ativo
- [ ] Senhas de BD fortes
- [ ] HTTPS habilitado
- [ ] Headers de segurança (Helmet)

### Banco de Dados

- [ ] Migrações executadas
- [ ] Índices criados
- [ ] Backup realizado
- [ ] Scripts de rollback testados

### Monitoramento

- [ ] Logs configurados
- [ ] Alertas ativiados
- [ ] Monitoring rodando
- [ ] Health check funcionando

### Post-Deploy

- [ ] Verificar logs
- [ ] Testar endpoints principais
- [ ] Confirmar dados
- [ ] Comunicar ao time

---

## 📚 Referências Úteis

### JavaScript/Node.js
- [MDN Web Docs](https://developer.mozilla.org)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

### Express.js
- [Express.js Documentation](https://expressjs.com)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

### Prisma
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Best Practices](https://www.prisma.io/docs/orm/prisma-client/queries/best-practices)

### Git
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)

---

## 🎯 Objetivo de Qualidade

Nosso código deve ser:

✅ **Legível** - Fácil de entender  
✅ **Testável** - Com testes automatizados  
✅ **Mantenível** - Fácil de modificar  
✅ **Performático** - Rápido e eficiente  
✅ **Seguro** - Sem vulnerabilidades  
✅ **Documentado** - Com boas explicações  

---

## 🆘 Suporte

Dúvidas? 

1. Consulte a documentação
2. Abra uma discussion no GitHub
3. Pergunte no Slack/Discord
4. Contacte um maintainer

---

**Obrigado por contribuir! 🎉**
