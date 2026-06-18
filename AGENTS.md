# 🤖 AGENTS.md - Diretrizes para Assistentes de IA

Este arquivo contém o contexto do projeto, padrões de arquitetura, decisões tecnológicas e restrições técnicas do **Rocketlog**. Qualquer agente ou assistente de IA deve ler e respeitar estritamente estas diretrizes ao propor código ou modificações no projeto.

---

## 📋 Contexto do Projeto

O **Rocketlog** é uma API de gerenciamento e rastreio de encomendas desenvolvida em **Node.js** com **TypeScript** e **Prisma ORM** integrada a um banco de dados **PostgreSQL**. A aplicação opera com níveis de acesso de usuários (RBAC): `admin`, `seller` e `customer`.

---

## 🚨 Restrições Técnicas Críticas (Leitura Obrigatória)

### 1. Runtime do Projeto (Node.js)
- **Regra**: Este projeto roda **estritamente em Node.js** (versão 20+).
- **Proibido**: **NÃO utilize APIs do Bun** (ex: `Bun.password.verify`, `Bun.serve`, etc.). Para criptografia de senhas, use a biblioteca `bcrypt` já instalada.

### 2. Caminho de Importação do Prisma Client (Output Customizado)
- **Regra**: O Prisma Client está configurado no [`schema.prisma`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/prisma/schema.prisma) para ser gerado em uma pasta customizada: `output = "../src/generated/prisma"`.
- **Importação Correta**: Você **DEVE** importar o `PrismaClient` a partir da pasta gerada, e não do pacote genérico `@prisma/client`.
  * **Correto**: `import { PrismaClient } from "../generated/prisma";` ou `import { PrismaClient } from "@/generated/prisma";`
  * **Incorreto**: `import { PrismaClient } from "@prisma/client";`

### 3. Gerenciamento de Dependências (Docker Host vs Container)
- **Regra**: O servidor de desenvolvimento roda dentro de um container Docker. A pasta `node_modules` do container está isolada da máquina local por um volume.
- **Ação**: Se precisar instalar ou atualizar pacotes npm, execute o comando de instalação **dentro** do container para atualizar o volume e depois replique na máquina local para atualizar o editor de código:
  * Rodar no container: `docker compose exec app npm install <pacote>`
  * Atualizar o host: `cmd /c npm install`
  * Sempre reiniciar o container após atualizar pacotes: `docker compose restart app`

### 4. Evitar Alargamento de Tipos (Type Widening)
- **Regra**: Ao declarar configurações estáticas do projeto (como o arquivo [`auth.ts`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/src/configs/auth.ts)), congele os tipos usando a asserção `as const`. Isso previne que strings estáticas sejam interpretadas como strings genéricas e causem erros com bibliotecas tipadas (como `jsonwebtoken`).

---

## 🛠️ Padrões de Código & Arquitetura

### 1. Nomenclatura e Tipagem
- **CamelCase**: Variáveis, propriedades de objetos e nomes de arquivos de código (exceto classes que usam PascalCase e tabelas do banco) devem usar camelCase.
- **Tipos Estritos**: Evite o tipo `any`. Declare interfaces claras para parâmetros e payloads.
- **Aliases**: Sempre utilize o alias `@/` mapeado para a pasta `src/` para importações absolutas limpas (ex: `import { prisma } from "@/database/prisma"`).

### 2. Validação e Segurança
- **Zod**: Use Zod para validar a entrada de dados (`request.body`, `request.params`) em todos os controllers antes de executar a lógica de negócios.
- **RBAC (Nível de Acesso)**: As rotas privadas devem utilizar o middleware `ensureAuthenticated` seguido pelo middleware `verifyUserAuthorization(["role1", "role2"])` para validar o nível de acesso. Os papéis válidos definidos no banco são: `admin`, `seller` e `customer`.

### 3. Tratamento de Erros
- **AppError**: Para erros de regra de negócio conhecidos (erros de validação, senhas inválidas, recurso não encontrado), dispare a classe `AppError` localizada em `src/utils/AppError.ts` informando a mensagem e o código HTTP correspondente.
- **Sem try/catch em controllers**: Graças ao uso do pacote `express-async-errors` e do middleware global `errorHandling` (em `src/midllewares/error-handling.ts`), você não deve poluir os controllers com blocos `try/catch` para capturar erros comuns. Deixe-os propagar para o middleware global.

---

## 📚 Documentação de Apoio
Antes de propor mudanças arquiteturais ou rotas novas, consulte os manuais na pasta `/docs`:
- [**Página Inicial da Documentação**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/README.md)
- [**🛠️ Stack Tecnológica**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/stack.md)
- [**🔐 Autenticação & Autorização (RBAC)**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/auth.md)
- [**🛣️ Guia de Rotas & Endpoints**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/routes.md)
