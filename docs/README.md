# 🚀 Rocketlog - Documentação do Projeto

Bem-vindo à documentação oficial do **Rocketlog**! Este espaço centraliza todas as informações técnicas, decisões de arquitetura, guias de execução e detalhes sobre o fluxo de desenvolvimento do projeto.

---

## 📌 Sobre o Rocketlog

O **Rocketlog** é uma API robusta de encomendas e logística desenvolvida para gerenciar o ciclo de vida de entregas. A API fornece suporte para diferentes tipos de usuários (Clientes, Vendedores e Administradores), registro de encomendas e um sistema detalhado de histórico de movimentação (logs de entrega).

---

## 🗺️ Índice da Documentação

Navegue pelas seções da documentação utilizando os links abaixo:

1. [**🛠️ Stack Tecnológica**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/stack.md)
   - Visão detalhada de todas as linguagens, frameworks, banco de dados, ORM, bibliotecas de autenticação e ferramentas de desenvolvimento.
2. [**🔐 Autenticação & Autorização (RBAC)**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/auth.md)
   - Como funciona o fluxo de segurança do projeto, geração de tokens JWT, middlewares de validação e restrições baseadas em papéis (`seller`, `admin`, `customer`).
3. [**🛣️ Guia de Rotas & Endpoints**](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/docs/routes.md)
   - Lista detalhada de todos os endpoints expostos pela API, contendo exemplos de requisição e resposta.

---

## ⚡ Como Começar

Para rodar o projeto localmente, certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

1. Instale as dependências locais:
   ```bash
   npm install
   ```
2. Inicialize o ambiente com Docker Compose (inicia o banco PostgreSQL e a aplicação):
   ```bash
   docker compose up --build
   ```
3. Execute as migrações do Prisma (se aplicável):
   ```bash
   docker compose exec app npx prisma migrate dev
   ```
4. O servidor iniciará na porta `3333`. Acesse localmente em `http://localhost:3333`.
