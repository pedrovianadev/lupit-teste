# Lupit Teste

Este repositório contém o projeto Lupit Teste, que inclui um backend construído com NestJS e um frontend desenvolvido com Next.js. Abaixo estão as instruções para configurar e rodar o projeto localmente.

## Estrutura do Projeto

- **`backend/`**: Contém o código-fonte do backend.
- **`frontend/`**: Contém o código-fonte do frontend.
- **`docker-compose.yml`**: Arquivo de configuração para o Docker Compose.

## Pré-requisitos

Antes de começar, você precisará ter o Docker e o Docker Compose instalados em sua máquina. Além disso, é necessário ter o Node.js e o npm instalados.

## Configuração do Backend

1. **Navegue para o diretório do backend:**

   ```cd backend```
Instale as dependências:

   ```npm install```
Configure o banco de dados:

Renomeie o arquivo .env.example para .env e ajuste as variáveis de ambiente conforme necessário.

Execute as migrations:

  ```npx prisma migrate dev```
Inicie o servidor:

  ```npm run start```
O backend estará disponível em http://localhost:3001.

Configuração do Frontend
Navegue para o diretório do frontend:

  ```cd frontend```
Instale as dependências:

  ```npm install```
Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env e ajuste as variáveis de ambiente conforme necessário.

Inicie o servidor de desenvolvimento:

  ```npm run dev```

O frontend estará disponível em http://localhost:3000.

Usando Docker
Para rodar a aplicação usando Docker e Docker Compose, siga os passos abaixo:

Navegue para o diretório do projeto:

  ```cd <diretório_do_projeto>```
Construa e inicie os containers:

  ```docker-compose up --build```
Isso irá construir as imagens Docker e iniciar os containers para o backend e o frontend.
