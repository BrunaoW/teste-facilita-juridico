## Acompanha Limpeza
### Plataforma de Acompanhamento de clientes de uma empresa de Limpeza

Este repositório consiste em uma plataforma fullstack como teste técnico para a empresa Facilita Jurídico, implementado utilizando NodeJS, React e PostgreSQL.

___
### Vídeo demonstrativo

https://github.com/BrunaoW/teste-facilita-juridico/assets/33531759/7097bca1-fd45-4fb0-b348-f66ea867ddec

___

### Configuração

- Versões:
```
  PostgreSQL: 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
  NodeJS: v16.14.2
  npm: 8.5.0
```
- Para configurar e executar o projeto em sua máquina, é necessário seguir os seguintes passos após o clone no repositório:
  1. Entrar no prompt do PostgreSQL pelo terminal, e em seguida, criar o banco de dados no PostgreSQL localmente pelo seguinte arquivo DDL abaixo, e conectar no banco criado:
  ```bash
  sudo -u postgres psql
  ```
  ```sql
    CREATE DATABASE acompanhalimpeza;
    \c acompanhalimpeza;
  ```
  2. Criar a tabela do banco a ser utilizada pela API pelo prompt
  ```sql
    CREATE EXTENSION citext;
    
    CREATE TABLE Customers (
      customer_id SERIAL PRIMARY KEY,
      customer_name VARCHAR(100),
      email CITEXT,
      phone VARCHAR(25),
      x_address INT,
      y_address INT
    );
  ```
  3. Rodar os seguintes comandos para instalar os pacotes npm do frontend e rodar a aplicação em um terminal:
  ```bash
  cd ./client
  npm install
  npm start
  ```
  4. Rodar os seguintes comandos para instalar os pacotes npm do backend, o nodemon, e mudar o nome do arquivo de ambiente .env, que contem informações sobre o banco de dados, e enfim, rodar a API em outro terminal:
  ```bash
  cd ./server
  npm install
  npm i -g nodemon
  cp -a .env.example .env
  nodemon index
  ```
