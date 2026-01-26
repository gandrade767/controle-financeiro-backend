# Guia de Instalação e Configuração

## 🚀 Início Rápido

### Pré-requisitos
- Node.js v18 ou superior
- npm ou yarn
- PostgreSQL v12 ou superior
- Git

### Instalação em 5 Minutos

1. **Clone o repositório**
```bash
git clone <seu-repositorio> controle-financeiro
cd controle-financeiro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
# Crie um banco de dados PostgreSQL
createdb controle_financeiro
```

4. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/controle_financeiro"
JWT_SECRET="sua-chave-secreta-muito-segura-com-minimo-32-caracteres"
PORT=3000
NODE_ENV=development
```

5. **Execute as migrações**
```bash
npx prisma migrate dev
```

6. **Inicie o servidor**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📦 Instalação Detalhada

### Windows

#### 1. Instalar Node.js
- Acesse https://nodejs.org/
- Baixe a versão LTS
- Execute o instalador
- Verifique: `node --version` e `npm --version`

#### 2. Instalar PostgreSQL
- Acesse https://www.postgresql.org/download/windows/
- Baixe o instalador
- Execute e siga as instruções
- Anote a senha do usuário `postgres`
- Verifique: `psql --version`

#### 3. Clonar Repositório
```powershell
git clone <seu-repositorio>
cd controle-financeiro
```

#### 4. Dependências
```powershell
npm install
```

#### 5. Banco de Dados
```powershell
# Conecte ao PostgreSQL
psql -U postgres

# No prompt psql, crie o banco:
CREATE DATABASE controle_financeiro;
\q
```

#### 6. Variáveis de Ambiente
Crie `.env`:
```env
DATABASE_URL="postgresql://postgres:sua-senha@localhost:5432/controle_financeiro"
JWT_SECRET="sua-chave-secreta-minimo-32-caracteres"
PORT=3000
NODE_ENV=development
```

#### 7. Migrações
```powershell
npx prisma migrate dev
```

#### 8. Iniciar
```powershell
npm run dev
```

---

### macOS

#### 1. Instalar Homebrew (se não tiver)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. Instalar Node.js
```bash
brew install node
```

#### 3. Instalar PostgreSQL
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### 4. Clonar e Instalar
```bash
git clone <seu-repositorio>
cd controle-financeiro
npm install
```

#### 5. Criar Banco de Dados
```bash
createdb controle_financeiro
```

#### 6. Configurar .env
```env
DATABASE_URL="postgresql://localhost/controle_financeiro"
JWT_SECRET="sua-chave-secreta-minimo-32-caracteres"
PORT=3000
NODE_ENV=development
```

#### 7. Migrações e Iniciar
```bash
npx prisma migrate dev
npm run dev
```

---

### Linux (Ubuntu/Debian)

#### 1. Atualizar Pacotes
```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 3. Instalar PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 4. Criar Banco de Dados
```bash
sudo -u postgres createdb controle_financeiro
```

#### 5. Clonar e Instalar
```bash
git clone <seu-repositorio>
cd controle-financeiro
npm install
```

#### 6. Configurar .env
```bash
cat > .env << EOF
DATABASE_URL="postgresql://postgres@localhost/controle_financeiro"
JWT_SECRET="sua-chave-secreta-minimo-32-caracteres"
PORT=3000
NODE_ENV=development
EOF
```

#### 7. Migrações e Iniciar
```bash
npx prisma migrate dev
npm run dev
```

---

## 🔧 Variáveis de Ambiente

### Obrigatórias

**DATABASE_URL**
- Formato: `postgresql://usuario:senha@localhost:5432/banco`
- Exemplo: `postgresql://postgres:123456@localhost:5432/controle_financeiro`

**JWT_SECRET**
- Chave secreta para assinar tokens
- Mínimo 32 caracteres
- Gere uma segura: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Use em produção: `openssl rand -hex 32`

### Opcionais

**PORT**
- Porta do servidor
- Padrão: `3000`

**NODE_ENV**
- `development` - Modo desenvolvimento
- `production` - Modo produção
- Padrão: `development`

**JWT_EXPIRE**
- Expiração do access token
- Padrão: `24h`
- Formatos: `"7d"`, `"24h"`, `"3600"` (segundos)

**REFRESH_TOKEN_EXPIRE**
- Expiração do refresh token
- Padrão: `7d`

**CORS_ORIGIN**
- Origens permitidas para CORS
- Múltiplos: `"http://localhost:3000,http://localhost:5173"`
- Padrão: `*` (qualquer origem)

## 🗄️ Banco de Dados

### Estrutura de Tabelas

```sql
-- users: Usuários do sistema
-- accounts: Contas bancárias
-- categories: Categorias de transações
-- transactions: Transações (receitas/despesas/transferências)
-- recurrences: Transações recorrentes
```

### Migrações

#### Criar Nova Migração
```bash
npx prisma migrate dev --name descricao_mudanca
```

#### Aplicar Migrações
```bash
npx prisma migrate deploy
```

#### Resetar Banco (DEV ONLY)
```bash
npx prisma migrate reset
```

#### Ver Status
```bash
npx prisma migrate status
```

#### Abrir Prisma Studio
```bash
npx prisma studio
```

## 🔐 Segurança

### Em Desenvolvimento
- Senhas simples aceitáveis
- Sem rate limiting necessário
- CORS aberto (localhost)

### Antes de Produção
✅ **OBRIGATÓRIO:**
- [ ] Gerar JWT_SECRET seguro: `openssl rand -hex 32`
- [ ] Senhas seguras em DATABASE_URL
- [ ] HTTPS habilitado
- [ ] CORS configurado para domínio específico
- [ ] Rate limiting habilitado
- [ ] Logs configurados
- [ ] Backups automáticos
- [ ] Monitoramento ativo

### Arquivo .env.example
Sempre mantenha um `.env.example` commitado:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=sua-chave-secreta-aqui
PORT=3000
NODE_ENV=development
```

**IMPORTANTE:** Nunca commitar `.env` no Git!

## 🛠️ Troubleshooting

### Erro: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Erro: "ECONNREFUSED - PostgreSQL não conecta"
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS
Get-Service postgresql*  # Windows

# Iniciar se não estiver
sudo systemctl start postgresql  # Linux
brew services start postgresql@15  # macOS
```

### Erro: "Database does not exist"
```bash
# Criar banco de dados
createdb controle_financeiro
```

### Erro: "prisma migrate dev" falha
```bash
# Resetar e recriar (dev only)
npx prisma migrate reset

# Ou aplicar migrações
npx prisma migrate deploy
```

### Erro: "Port 3000 already in use"
```bash
# Mude a porta no .env
PORT=3001

# Ou mate o processo usando porta 3000
# Linux/macOS:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "JWT_SECRET not defined"
- Verifique se `.env` existe
- Verifique se `JWT_SECRET` está no `.env`
- Reinicie o servidor após adicionar

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start

# Verificar sintaxe
npm run lint  # (se configurado)

# Testes
npm test  # (se configurado)

# Prisma
npx prisma generate      # Gerar cliente
npx prisma studio       # Interface visual
npx prisma migrate dev  # Criar migração
```

## 🚀 Deploy

### Deploy no Heroku

```bash
# 1. Criar app
heroku create seu-app-name

# 2. Adicionar addon PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev -a seu-app-name

# 3. Configurar variáveis
heroku config:set JWT_SECRET="sua-chave" -a seu-app-name

# 4. Deploy
git push heroku main

# 5. Executar migrações
heroku run npx prisma migrate deploy -a seu-app-name
```

### Deploy na AWS/Google Cloud/DigitalOcean
- Criar instância Linux
- Instalar Node.js e PostgreSQL
- Clonar repositório
- Configurar `.env`
- Usar PM2 ou Docker
- Configurar nginx como reverse proxy
- Ativar SSL com Let's Encrypt

## 🐳 Docker (Opcional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: controle_financeiro
    ports:
      - "5432:5432"

  api:
    build: .
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/controle_financeiro
      JWT_SECRET: secret
    ports:
      - "3000:3000"
```

### Iniciar com Docker
```bash
docker-compose up
```

## 📞 Suporte

Em caso de problemas:
1. Consulte a seção Troubleshooting
2. Abra uma issue no GitHub
3. Verifique a documentação dos módulos
4. Contacte o time de desenvolvimento
