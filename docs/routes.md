# 🛣️ Guia de Rotas & Endpoints

Este documento lista e exemplifica todos os endpoints HTTP expostos pela API do **Rocketlog**, incluindo os payloads esperados e os formatos de resposta.

---

## 👥 Rotas de Usuários (`/users`)

### 📤 Criar Novo Usuário
Cadastra um novo usuário no banco de dados. Por padrão, novos usuários são criados com o papel (`role`) de `customer`.

- **URL:** `/users`
- **Método HTTP:** `POST`
- **Autenticação:** Nenhuma (Rota pública)
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Clara Nascimento",
    "email": "clara.teste@email.com",
    "password": "senha_segura"
  }
  ```
- **Resposta (201 Created):**
  ```json
  {
    "id": "3dd69b35-6d35-44d0-87b7-8af1f3df5222",
    "name": "Clara Nascimento",
    "email": "clara.teste@email.com",
    "role": "customer",
    "createdAt": "2026-06-18T18:34:14.927Z",
    "updatedAt": "2026-06-18T18:34:14.927Z"
  }
  ```

---

## 🔐 Rotas de Sessões/Login (`/sessions`)

### 📥 Efetuar Login
Autentica o usuário e retorna o token JWT de acesso necessário para as rotas protegidas.

- **URL:** `/sessions`
- **Método HTTP:** `POST`
- **Autenticação:** Nenhuma (Rota pública)
- **Corpo da Requisição (JSON):**
  ```json
  {
    "email": "clara.teste@email.com",
    "password": "senha_segura"
  }
  ```
- **Resposta (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "3dd69b35-6d35-44d0-87b7-8af1f3df5222",
      "name": "Clara Nascimento",
      "email": "clara.teste@email.com",
      "role": "seller",
      "createdAt": "2026-06-18T18:34:14.927Z",
      "updatedAt": "2026-06-18T22:09:15.623Z"
    }
  }
  ```

---

## 📦 Rotas de Entregas (`/deliveries`)

*Nota: Todas as rotas abaixo exigem cabeçalho de autenticação Bearer Token (`Authorization: Bearer <token>`) de um usuário com nível de acesso **`seller`**.*

### 📤 Cadastrar Nova Entrega
Cria uma encomenda associada a um destinatário (`user_id`).

- **URL:** `/deliveries`
- **Método HTTP:** `POST`
- **Headers:** `Authorization: Bearer <token_do_vendedor>`
- **Corpo da Requisição (JSON):**
  ```json
  {
    "user_id": "86ee5091-7149-4385-8996-16d9c6877aa0",
    "description": "Teclado mecânico gamer"
  }
  ```
- **Resposta (201 Created):**
  *(Corpo vazio)*

---

### 📥 Listar Todas as Entregas
Retorna uma lista de todas as entregas registradas no sistema.

- **URL:** `/deliveries`
- **Método HTTP:** `GET`
- **Headers:** `Authorization: Bearer <token_do_vendedor>`
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": "7bf3d0e9-b541-4770-9884-bb9f170f20bc",
      "userId": "86ee5091-7149-4385-8996-16d9c6877aa0",
      "description": "Teclado mecânico gamer",
      "status": "processing",
      "createdAt": "2026-06-18T19:15:33.201Z",
      "updatedAt": "2026-06-18T19:15:33.201Z"
    }
  ]
  ```
