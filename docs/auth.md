# 🔐 Autenticação & Autorização (RBAC)

Este documento detalha o fluxo de segurança, autenticação e controle de acesso baseado em papéis (RBAC - *Role-Based Access Control*) implementado no **Rocketlog**.

---

## 🔑 Fluxo de Autenticação (JWT)

A autenticação é feita utilizando **JSON Web Tokens (JWT)**. O fluxo funciona da seguinte forma:

1. O cliente faz uma requisição `POST /sessions` enviando seu **e-mail** e **senha**.
2. O servidor valida os dados recebidos via Zod, busca o usuário no banco de dados e valida se a senha informada corresponde ao hash de senha salvo (utilizando `bcrypt.compare()`).
3. Caso a senha seja válida, o servidor gera um Token contendo:
   - **Payload**: `{ role: user.role }` (armazena o papel/nível de acesso do usuário).
   - **Subject**: `user.id` (armazena a chave de identificação do usuário).
   - **Configurações**: Utiliza o segredo e o tempo de expiração definidos na configuração da aplicação.
4. O servidor retorna o token gerado e os dados do usuário (excluindo a senha).

---

## 🛡️ Middleware `ensureAuthenticated`

O middleware [`ensureAuthenticated`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/src/midllewares/ensure-authenticated.ts) protege as rotas privadas. Ele executa os seguintes passos:

1. **Captura do Header:** Busca o cabeçalho `Authorization` nas headers HTTP da requisição.
2. **Validação do Formato:** Verifica se o token foi informado e separa a string do formato `Bearer <token>`.
3. **Decodificação & Validação:** Utiliza a função `verify` do `jsonwebtoken` para validar o token com a chave secreta. Se o token estiver vencido ou for inválido, dispara um erro de autenticação (`401 Unauthorized`).
4. **Anexação de Contexto:** Extrai o `sub` (ID do usuário) e a `role` (papel) do payload decodificado e anexa essa informação no objeto `request.user`.

```typescript
// Adiciona as informações do usuário ao objeto request
request.user = {
    id: user_id, // String contendo o UUID do usuário
    role // Papel do usuário (admin, seller, customer)
};
```

### 📝 Extensão do Tipo `Request` no TypeScript
Como o Express padrão não possui o campo `user` em sua tipagem de requisições, foi necessária a criação de um arquivo de declaração global em [`src/@types/express.d.ts`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/src/@types/express.d.ts):

```typescript
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
```
Isso permite que utilizemos `request.user` em qualquer local da aplicação de forma fortemente tipada e livre de erros do compilador.

---

## 🚦 Controle de Acesso Baseado em Nível (RBAC)

O controle de quem pode fazer o que é intermediado pelo middleware [`verifyUserAuthorization`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/src/midllewares/verivyUserAuthorization.ts).

Esse middleware funciona como uma fábrica de funções (*factory function*) que recebe um array com as permissões autorizadas e retorna um middleware do Express:

```typescript
function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized", 403);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 403);
    }

    return next();
  };
}
```

### 🏷️ Exemplo de Uso (Rotas de Entregas)
No arquivo [`deliveries-routes.ts`](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/Rocketlog/src/routes/deliveries-routes.ts), as rotas de entregas são fechadas apenas para usuários que possuem o papel de vendedor (`seller`):

```typescript
// Aplica a validação de token e exige a role "seller"
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["seller"]));
```
Caso um usuário com papel de `customer` tente fazer uma requisição nesta rota, o middleware interceptará e lançará um erro HTTP **`403 Forbidden`**.
