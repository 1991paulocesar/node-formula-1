# 🏎️ Formula One API

API RESTful com operações CRUD completas para times e pilotos de Fórmula 1, construída com Node.js, Fastify e MySQL.

Este projeto é baseado no desafio de projeto da [DIO](https://www.dio.me/), a partir do repositório de referência [node-formula-1](https://github.com/digitalinnovationone/node-formula-1) do instrutor Felipe Aguiar, expandido com CRUD completo e persistência em banco de dados relacional.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** — framework web
- **MySQL** — banco de dados relacional
- **mysql2** — driver de conexão
- **tsx** — execução de TypeScript sem build prévio
- **Bruno** — cliente de API para testes (coleção incluída no repo)

## 📋 Funcionalidades

| Método | Rota           | Descrição                        |
|--------|----------------|-----------------------------------|
| GET    | `/teams`       | Lista todos os times              |
| GET    | `/teams/:id`   | Busca um time por id              |
| POST   | `/teams`       | Cria um novo time                 |
| PUT    | `/teams/:id`   | Atualiza um time existente        |
| DELETE | `/teams/:id`   | Remove um time                    |
| GET    | `/drivers`     | Lista todos os pilotos            |
| GET    | `/drivers/:id` | Busca um piloto por id            |
| POST   | `/drivers`     | Cria um novo piloto               |
| PUT    | `/drivers/:id` | Atualiza um piloto existente      |
| DELETE | `/drivers/:id` | Remove um piloto                  |

## 📦 Pré-requisitos

- Node.js 20+
- MySQL instalado e rodando localmente (ou acessível remotamente)
- (Opcional) [Bruno](https://www.usebruno.com/) para testar as rotas com a coleção pronta

## ⚙️ Configuração

1. Clone o repositório:
```bash
   git clone https://github.com/1991paulocesar/node-formula-1.git
   cd node-formula-1
```

2. Instale as dependências:
```bash
   npm install
```

3. Crie o banco de dados e as tabelas rodando o script `schema.sql` no seu MySQL (via DBeaver, MySQL Workbench, ou linha de comando):
```bash
   mysql -u root -p < schema.sql
```

4. Copie o arquivo de exemplo de variáveis de ambiente e preencha com suas credenciais:
```bash
   cp .env.example .env
```
   Edite o `.env`:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=formula_one

5. Inicie o servidor:
```bash
   npm run start:dev
```
   A API estará disponível em `http://localhost:3333`.

## 🧪 Testando as rotas

A pasta `bruno/f1-api` contém uma coleção pronta do [Bruno](https://www.usebruno.com/) com todas as requisições (GET, POST, PUT, DELETE) já configuradas usando a variável `{{base_url}}`. Basta abrir a coleção no Bruno e selecionar o environment `local`.

## 🗂️ Estrutura do projeto
node-formula-1/
├── src/
│   ├── server.ts       # Rotas da API
│   └── database.ts     # Conexão com o MySQL
├── bruno/              # Coleção de testes (Bruno)
├── schema.sql          # Script de criação do banco e seed de dados
├── .env.example        # Modelo de variáveis de ambiente
└── README.md

## 📚 Aprendizados

Este desafio foi construído em etapas, evoluindo de uma API com dados em memória para uma API conectada a um banco de dados MySQL real, incluindo:
- Estruturação de rotas CRUD com Fastify e TypeScript
- Tipagem de parâmetros de rota e corpo de requisição
- Uso de variáveis de ambiente para configuração segura
- Modelagem de banco de dados relacional
- Testes de API documentados e versionados com Bruno

## 👤 Autor

**Paulo César Ferreira Matos Silva**
GitHub: [@1991paulocesar](https://github.com/1991paulocesar)

## 🔗 Referência

Projeto original: [digitalinnovationone/node-formula-1](https://github.com/digitalinnovationone/node-formula-1)