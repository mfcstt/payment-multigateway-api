## Payment MultiGateway API

API RESTful desenvolvida como solução para o **Teste Prático Back-end BeTalent**, utilizando **AdonisJS 7**, **MySQL** e integração com **dois gateways de pagamento externos**.

Foi a minha primeira vez trabalhando com o framework **AdonisJS**. No começo precisei me adaptar à estrutura e às convenções do framework, mas após entender melhor o ecossistema o desenvolvimento fluiu de forma bem mais natural. Durante o projeto busquei aplicar conceitos de **SOLID**, **Design Patterns** e **DDD**, principalmente na separação entre domínio, casos de uso e camada de infraestrutura (adapters/strategy dos gateways).

Confesso que ainda tenho dificuldade com **TDD**. Para este projeto, foquei em implementar primeiro os **use cases** e depois escrever testes unitários para eles. É um ponto que sei que preciso aprimorar (idealmente começar pelos testes), mas já busquei manter os casos de uso bem isolados para facilitar esse processo.

---

### ✅ Escopo implementado

- **Autenticação e usuários**
  - Cadastro (`signup`), login (`login`), logout e rota de `profile` autenticada.
  - CRUD de usuários com validação baseada em **roles** usando o **Bouncer** do Adonis.
- **Produtos**
  - CRUD completo de produtos, com validação via validators e uso de casos de uso dedicados.
- **Gateways de pagamento**
  - Integração com **dois gateways externos** (mock `matheusprotzen/gateways-mock`), usando adapters separados.
  - Implementação de **prioridade de gateways** usando uma **estrutura inspirada em fila**, pensando na facilidade de adicionar novos gateways de forma simples e modular.
  - Rota para **alterar prioridade** de gateways e **toggle** de ativação.
- **Clientes e compras**
  - Registro de transações ligadas a clientes, produtos e gateways.
  - Listagem de compras, detalhe de compra, reembolso via gateway.
  - Listagem de clientes e rota para listar compras de um cliente.
- **Autorização por roles**
  - Uso do **Bouncer** do Adonis para restringir operações sensíveis por role (ex.: gerenciar usuários, produtos, gateways e reembolsos).
- **Tratamento de erros**
  - **Exceptions customizadas**, seguindo a documentação do Adonis, para padronizar erros de regra de negócio e erros de infraestrutura.
- **Documentação da API**
  - UI de documentação com **Scalar / OpenAPI**, utilizando **adonis-autoswagger**.

---

### 🧱 Arquitetura e decisões de design

- **DDD + Use Cases**
  - A lógica de negócio fica concentrada em **casos de uso** (`app/use_cases`), que recebem repositórios/adapters como dependências.
  - Controllers ficam finos, orquestrando validação, autorização e chamadas para os casos de uso.
- **Gateway Strategy + Adapters**
  - Cada gateway tem seu próprio **adapter** na camada de infraestrutura (`app/infrastructure`), responsável por lidar com o contrato HTTP específico daquele serviço.
  - Existe uma **strategy** que conhece o mapeamento entre um identificador lógico e o adapter, por exemplo:
    - `'gateway1': new Gateway1Adapter()`
    - `'gateway2': new Gateway2Adapter()`
  - Para adicionar um novo gateway, basta criar um novo adapter que implemente a interface esperada e registrá-lo na strategy.
- **Fila de prioridade de gateways**
  - A funcionalidade de alteração de prioridade começou como “troca de posição” entre gateways, recebendo uma nova prioridade e ajustando as existentes.
  - No meio do desenvolvimento percebi que isso **não escalaria bem** e dificultaria a adição de novos gateways.
  - Reestruturei a lógica para algo mais próximo de uma **fila ordenada por prioridade**, o que torna mais simples reorganizar a ordem e incluir novos gateways mantendo consistência.
- **Autorização (roles)**
  - As permissões são feitas com **Bouncer**, seguindo a documentação oficial do Adonis:
    - `ADMIN`, `MANAGER`, `FINANCE`, `USER` (conforme proposta do desafio).
  - Policies específicas controlam quem pode gerenciar usuários, produtos, gateways, visualizar compras ou reembolsar transações.
- **Exception Handling**
  - Uso de **exceptions customizadas** para erros de domínio (ex.: entidade não encontrada, regra violada) e erros de infraestrutura.
  - Isso ajuda a padronizar a saída de erro e manter o controller mais limpo.

---

### 🐳 Docker Compose

O projeto possui um `docker-compose.yml` que sobe:

- **app**: aplicação AdonisJS em Node 22 (modo dev).
- **db**: MySQL 8 com banco `adonis_db` e usuário `adonis_user`.
- **gateway-mock**: container com os dois gateways de pagamento (`3001` e `3002`) usando a imagem `matheusprotzen/gateways-mock`.

#### Subindo tudo com Docker

1. **Pré-requisitos**
   - Docker e Docker Compose instalados.

2. **Subir os serviços**
   ```bash
   docker compose up
   ```

3. **Aplicar migrações** (primeira vez que subir)
   - Em outro terminal, dentro do container da aplicação:
   ```bash
   docker compose exec app npx node ace migration:run
   ```

4. **Acessos principais**
   - API: `http://localhost:3333`
   - Documentação Scalar/OpenAPI: `http://localhost:3333/docs`
   - OpenAPI (YAML/JSON): `http://localhost:3333/openapi`
   - MySQL: `localhost:3306` (user: `adonis_user`, db: `adonis_db`)

> Observação: os mocks dos gateways são expostos internamente como `http://gateway-mock:3001` e `http://gateway-mock:3002` para a aplicação, e externamente em `http://localhost:3001` e `http://localhost:3002`.

---

### 🚀 Como rodar localmente (sem Docker)

#### Requisitos

- Node.js >= 20
- MySQL 8

#### Configuração

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar `.env`**
   - Já existe um arquivo `.env` de exemplo com:
     - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`
     - Variáveis dos gateways (`GATEWAY_1_*`, `GATEWAY_2_*`)
   - Ajuste se necessário para o seu ambiente.

3. **Subir MySQL**
   - Criar banco `adonis_db` e usuário `adonis_user` (ou conforme seu `.env`).

4. **Rodar migrações**
   ```bash
   npx node ace migration:run
   ```

5. **Rodar servidor em desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Subir mocks de gateway (opcional fora do Docker)**
   ```bash
   docker run -p 3001:3001 -p 3002:3002 matheusprotzen/gateways-mock
   ```

---

### 🌐 Principais rotas da API

> Os detalhes completos (schemas, exemplos, responses) estão na UI do Scalar em `http://localhost:3333/docs`. 
> Além disso, há um arquivo do Postman disponível na raiz do projeto para facilitar a importação da coleção e o teste das rotas.
Abaixo um resumo organizado por contexto.

- **Auth (`/auth`)**
  - `POST /auth/signup` – Cria usuário e retorna token de acesso.
  - `POST /auth/login` – Autenticação com e-mail/senha, retorna token.
  - `POST /auth/logout` – Invalida o token atual (auth required).

- **Account/Profile (`/account`)**
  - `GET /account/profile` – Retorna o usuário autenticado.

- **Users (`/users`)** – rotas protegidas por role (Bouncer)
  - `GET /users` – Lista todos os usuários.
  - `GET /users/:id` – Detalhe de um usuário.
  - `PUT /users/:id` – Atualiza usuário.
  - `DELETE /users/:id` – Remove usuário.

- **Products (`/products`)**
  - `GET /products` – Lista todos os produtos.
  - `GET /products/:id` – Detalhe de um produto.
  - `POST /products` – Cria produto.
  - `PUT /products/:id` – Atualiza produto.
  - `DELETE /products/:id` – Remove produto.

- **Gateways (`/gateways`)**
  - `PUT /gateways/:id` – Ativa/desativa gateway (toggle).
  - `PUT /gateways/:id/priority/:priority` – Atualiza prioridade do gateway na fila.

- **Purchases (`/purchases`)**
  - `POST /purchases` – Cria compra, calcula valor com base nos produtos e tenta cobrança respeitando a prioridade de gateways.
  - `GET /purchases` – Lista todas as compras (roles com permissão).
  - `GET /purchases/:id` – Detalhe de uma compra específica (com regra de visualização própria x admins/managers).
  - `POST /purchases/:id/refund` – Reembolso da compra no gateway responsável.

- **Clients (`/clients`)**
  - `GET /clients` – Lista todos os clientes.
  - `GET /clients/:id/purchases` – Lista todas as compras de um cliente.

---

### 🔐 Roles e autorização (Bouncer)

As roles previstas no desafio foram consideradas na implementação das policies:

- **ADMIN** – acesso total.
- **MANAGER** – pode gerenciar produtos e usuários.
- **FINANCE** – pode visualizar e gerenciar compras/reembolsos.
- **USER** – acesso às funcionalidades “padrão” (compra, visualização própria, etc.).

As regras são aplicadas via **Bouncer** nas actions sensíveis (CRUD de usuários/produtos, gerenciamento de gateways, listagem de compras, reembolso etc.).

---

### 🧪 Testes

- Os testes foram focados principalmente nos **use cases**, garantindo a lógica de negócio sem depender diretamente de HTTP ou banco real.
- O fluxo que segui foi: **implementar casos de uso → escrever testes unitários** para eles.
- Reconheço que o ideal no TDD seria começar pelos testes, mas mesmo assim mantive uma arquitetura que facilita evoluir nessa direção.

---

### 📌 O que ficou pendente / pontos de melhoria

- Aprofundar a cobertura de testes (principalmente de integrações completas entre controllers, casos de uso e banco).
- Automatizar o seed dos gateways no banco (atualmente o cadastro dos gateways foi feito manualmente).
- Refinar ainda mais a documentação automática do Swagger (ex.: exemplos customizados em todas as rotas, responses específicos por role).

---

### 💬 Considerações finais

Este projeto foi uma oportunidade muito boa para:

- Ter o primeiro contato mais profundo com **AdonisJS**;
- Exercitar **DDD**, **SOLID** e **design de camadas**;
- Trabalhar com múltiplos gateways externos e priorização de forma extensível;
- Praticar **TDD** em use cases, mesmo ainda não estando no nível que eu desejo.

Fico à disposição para explicar qualquer parte da solução, decisões de arquitetura ou pontos que queira revisar mais a fundo.
