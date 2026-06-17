# 🛠️ Stack Tecnológica - Rocketlog

Este documento descreve detalhadamente o conjunto de tecnologias, bibliotecas e ferramentas de desenvolvimento adotadas no **Rocketlog**, justificando as decisões técnicas para cada camada da aplicação.

---

## 💻 Linguagem e Runtime

### [Node.js](https://nodejs.org/)
- **Descrição**: Runtime JavaScript assíncrono baseado no motor V8 do Chrome.
- **Função**: Plataforma de execução do servidor da API.

### [TypeScript](https://www.typescriptlang.org/) (v5.5.4)
- **Descrição**: Superconjunto de JavaScript que adiciona tipagem estática opcional à linguagem.
- **Função**: Garante maior segurança no código, previne erros de digitação em tempo de desenvolvimento e fornece autocompletar eficiente (intellisense) para o desenvolvedor.

---

## 🌐 Framework Web

### [Express](https://expressjs.com/) (v4.19.2)
- **Descrição**: Framework web minimalista e flexível para Node.js.
- **Função**: Responsável por estruturar a aplicação, gerenciar o roteamento HTTP, tratamento de requisições e respostas, além de intermediar a lógica por meio de middlewares.

---

## 🗄️ Banco de Dados & ORM

### [PostgreSQL](https://www.postgresql.org/) (v16)
- **Descrição**: Banco de dados relacional (RDBMS) open-source amplamente conhecido por sua confiabilidade, robustez de dados e performance.
- **Função**: Armazenamento permanente dos dados das entregas, usuários e logs.

### [Prisma ORM](https://www.prisma.io/) (v5.19.1)
- **Descrição**: ORM de última geração para Node.js e TypeScript.
- **Função**: Facilitador de comunicação com o PostgreSQL. Mapeia as tabelas do banco de dados em tipos estáticos do TypeScript, gerencia migrações (`prisma migrate`) e otimiza consultas por meio de um client fortemente tipado.

---

## 🛡️ Validação & Tratamento de Erros

### [Zod](https://zod.dev/) (v3.23.8)
- **Descrição**: Biblioteca de declaração e validação de esquemas em TypeScript.
- **Função**: Valida os corpos de requisição (JSON), parâmetros de busca e variáveis de ambiente, garantindo que os dados inseridos correspondam estritamente ao esperado e gerando erros informativos caso contrário.

### [express-async-errors](https://www.npmjs.com/package/express-async-errors) (v3.1.1)
- **Descrição**: Extensão utilitária para o Express 4.
- **Função**: Captura automaticamente erros disparados dentro de rotas/funções assíncronas (`async/await`) e os repassa ao middleware global de tratamento de erros (`errorHandler`), eliminando a necessidade de blocos `try/catch` repetitivos em todos os controllers.

---

## 🐳 Infraestrutura & Containerização

### [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Descrição**: Plataformas para empacotar, distribuir e executar aplicações em containers isolados.
- **Função**:
  - **PostgreSQL**: Executado em container utilizando a imagem leve `postgres:16-alpine`, garantindo que qualquer desenvolvedor tenha exatamente o mesmo banco sem precisar instalar o PostgreSQL localmente.
  - **App**: Containerização do ambiente Node.js de desenvolvimento com sincronização de volumes e hot-reload habilitado via Docker Compose.

---

## ⚙️ Ferramentas de Desenvolvimento (DevTools)

- **`tsx`** (v4.16.2): Executor super rápido que transpila TypeScript para JavaScript sob demanda usando esbuild, com suporte nativo ao modo de watch (`tsx watch`) para hot-reload.
- **`ts-node`** (v10.9.2): Executor TypeScript para Node.js tradicional.
- **`tsc-alias`** (v1.8.17): Resolve caminhos mapeados por alias (ex: `@/*` definido no `tsconfig.json`) durante o processo de compilação da aplicação para produção.
- **`@types/express`** & **`@types/node`**: Fornecem as definições de tipos para que o TypeScript reconheça os pacotes do Express e do Node.js.
