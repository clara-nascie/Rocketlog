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

---

### 🔄 Alterar Status de uma Entrega
Atualiza o status de uma encomenda (ex: para `shiped` ou `delivered`). Esta alteração gera automaticamente um log correspondente de atualização no histórico.

- **URL:** `/deliveries/:id/status`
- **Método HTTP:** `PATCH`
- **Headers:** `Authorization: Bearer <token_do_vendedor>`
- **Corpo da Requisição (JSON):**
  ```json
  {
    "status": "shiped"
  }
  ```
- **Resposta (200 OK):**
  *(Corpo vazio)*

---

## 🚦 Rotas de Histórico & Logs de Encomendas (`/deliveries-logs`)

*Nota: As rotas de criação exigem token de `seller`, enquanto a rota de visualização permite tanto `seller` quanto `customer` (este último apenas se for a sua própria entrega).*

### 📤 Criar Novo Log de Entrega
Registra um evento ou atualização de rastreio na linha do tempo de uma encomenda.

- **URL:** `/deliveries-logs`
- **Método HTTP:** `POST`
- **Headers:** `Authorization: Bearer <token_do_vendedor>`
- **Corpo da Requisição (JSON):**
  ```json
  {
    "delivery_id": "0d6cff39-99cf-4a4c-9311-57a42e6ab8a3",
    "description": "Objeto em trânsito para a unidade de distribuição."
  }
  ```
- **Resposta (201 Created):**
  *(Corpo vazio)*

---

### 📥 Buscar Histórico/Logs de uma Entrega
Retorna a entrega e todas as suas atualizações registradas na linha do tempo.

- **URL:** `/deliveries-logs/:delivery_id/show`
- **Método HTTP:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Resposta (200 OK):**
  ```json
  {
    "id": "0d6cff39-99cf-4a4c-9311-57a42e6ab8a3",
    "userId": "86ee5091-7149-4385-8996-16d9c6877aa0",
    "description": "Teclado mecânico gamer",
    "status": "shiped",
    "createdAt": "2026-06-18T19:15:33.201Z",
    "updatedAt": "2026-06-18T19:30:10.052Z",
    "logs": [
      {
        "id": "d1a63c35-1823-4d40-9a3b-28f14ac63db9",
        "description": "Objeto postado pelo remetente.",
        "createdAt": "2026-06-18T19:20:15.110Z",
        "updatedAt": "2026-06-18T19:20:15.110Z"
      },
      {
        "id": "e2b74d46-2934-5e51-ab4c-39f25bd74ec0",
        "description": "Status atualizado para shiped",
        "createdAt": "2026-06-18T19:30:10.052Z",
        "updatedAt": "2026-06-18T19:30:10.052Z"
      }
    ]
  }
  ```
