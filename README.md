# 🚀 Rocketlog

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.x-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey?style=flat&logo=express)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.19-indigo?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-cyan?style=flat&logo=docker)](https://www.docker.com/)

O **Rocketlog** é uma API de gerenciamento e rastreio de encomendas desenvolvida em **Node.js** com **TypeScript**, utilizando o framework **Express** e o ORM **Prisma** integrado ao banco de dados **PostgreSQL**.

A aplicação foi estruturada visando a escalabilidade, robustez operacional e tipagem estática ponta a ponta, sendo ideal para monitorar fluxos logísticos de mercadorias desde o recebimento até a entrega final ao cliente.

---

## 📋 Índice

- [Funcionalidades Principais](#-funcionalidades-principais)
- [Stack Tecnológica](#%EF%B8%8F-stack-tecnol%C3%B3gica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Requisitos Mínimos](#-requisitos-m%C3%ADnimos)
- [Como Executar](#-como-executar)
  - [1. Configurando Variáveis de Ambiente](#1-configurando-vari%C3%A1veis-de-ambiente)
  - [2. Rodando com Docker Compose (Recomendado)](#2-rodando-com-docker-compose-recomendado)
  - [3. Rodando Localmente](#3-rodando-localmente)
  - [4. Executando Migrações do Banco de Dados](#4-executando-migra%C3%A7%C3%B5es-do-banco-de-dados)
- [Acesso ao Prisma Studio](#-acesso-ao-prisma-studio)
- [Documentação Completa](#%EF%B8%8F-documenta%C3%A7%C3%A3o-completa)

---

## 📦 Funcionalidades Principais

- **Gestão de Usuários com Níveis de Acesso (RBAC):**
  - **Customer (Cliente):** Destinatário final das encomendas.
  - **Seller (Vendedor):** Responsável por registrar e gerenciar as encomendas destinadas aos clientes.
  - **Admin (Administrador):** Controle total de usuários e encomendas no sistema.
- **Controle de Encomendas (Deliveries):**
  - Criação de entregas associadas a clientes específicos.
  - Atualização dinâmica de estados da entrega (`processing` ➡️ `shipped` ➡️ `delivered`).
- **Histórico de Logs (Delivery Logs):**
  - Registro cronológico de movimentação e status das encomendas, permitindo auditoria detalhada de cada etapa do envio.
- **Tratamento Global de Erros:** Captura automática de falhas de validação, erros de lógica do app (`AppError`) e exceções inesperadas.

---

## 🛠️ Stack Tecnológica

O projeto faz uso de ferramentas modernas que garantem produtividade e performance:

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework Web:** Express
- **Validação de Schemas:** Zod
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (via Docker)
- **Executores de Dev:** `tsx` (com auto-reload instantâneo)

Para mais detalhes sobre as justificativas e versões de cada ferramenta, acesse o documento da [**Stack Tecnológica**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/stack.md).

---

## 📂 Estrutura do Projeto

A arquitetura do Rocketlog separa a lógica em pastas focadas e reutilizáveis:

```text
Rocketlog/
├── docs/                     # Documentação markdown do projeto
│   ├── README.md             # Apresentação e Índice da doc
│   └── stack.md              # Detalhes das tecnologias utilizadas
├── prisma/                   # Configuração e esquemas do Prisma ORM
│   ├── migrations/           # Histórico de alterações do banco
│   └── schema.prisma         # Definição de modelos e relacionamentos
├── src/                      # Código fonte da aplicação
│   ├── controllers/          # Controladores (regras de entrada/saída)
│   ├── midllewares/          # Middlewares (tratamento de erros, autorização, etc.)
│   ├── routes/               # Rotas organizadas da API
│   ├── utils/                # Classes utilitárias e erros customizados
│   ├── app.ts                # Inicialização do app Express e middlewares
│   └── server.ts             # Inicialização do servidor HTTP na porta
├── Dockerfile                # Configuração do container da aplicação
├── docker-compose.yml        # Orquestração do app e do PostgreSQL
└── tsconfig.json             # Configurações do compilador TypeScript
```

---

## 💻 Requisitos Mínimos

Antes de começar, você precisará ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Como Executar

### 1. Configurando Variáveis de Ambiente

Na raiz do projeto, crie um arquivo `.env` baseado no exemplo abaixo:

```env
PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rocketlog?schema=public"
```

> [!NOTE]
> Se você estiver rodando a aplicação **dentro** do container Docker, a URL do banco configurada internamente no `docker-compose.yml` será usada de forma transparente (`postgresql://postgres:postgres@postgres:5432/rocketlog?schema=public`).

---

### 2. Rodando com Docker Compose (Recomendado)

O Docker Compose sobe automaticamente a aplicação Node.js (com sincronização de arquivos e hot-reload ativado) e a instância do PostgreSQL com volume persistente.

Execute o comando:
```bash
docker compose up --build
```
Após o build inicial, o servidor estará rodando em `http://localhost:3333`.

---

### 3. Rodando Localmente

Caso prefira rodar a aplicação Node diretamente na sua máquina hospedeira, siga os passos:

1. Suba apenas o banco de dados via Docker:
   ```bash
   docker compose up postgres -d
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O console exibirá que o servidor está rodando na porta `3333` com hot-reload ativo.

---

### 4. Executando Migrações do Banco de Dados

Para sincronizar a modelagem descrita no arquivo `schema.prisma` com o banco PostgreSQL, rode as migrações:

**Dentro do container do Docker (Recomendado para evitar conflitos de versões locais do Node.js):**
```bash
docker compose exec app npx prisma migrate dev
```

**Se rodando o Node.js diretamente na máquina:**
```bash
npx prisma migrate dev
```

---

## 🎛️ Acesso ao Prisma Studio

O Prisma Studio é uma interface gráfica de administrador para visualizar e editar os dados do seu banco de dados PostgreSQL.

Para iniciá-lo, execute:
```bash
npx prisma studio
```
Por padrão, o Prisma Studio será disponibilizado em `http://localhost:5555`.

---

## 📚 Documentação Completa

Para aprofundar seu conhecimento na arquitetura e nas rotas da aplicação, consulte o repositório de documentação na pasta `/docs`:

- [**Página Inicial da Documentação**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/README.md)
- [**Lista de Ferramentas & Stack**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/stack.md)
