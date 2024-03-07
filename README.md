## Acompanha Limpeza
### Plataforma de Acompanhamento de clientes de uma empresa de Limpeza

Este repositório consiste em uma plataforma fullstack como teste técnico para a empresa Facilita Jurídico, implementado utilizando NodeJS, React e PostgreSQL.

___
### Vídeo demonstrativo

<video width="320" height="240" controls>
  <source src="./video_teste_tecnico.mp4" type="video/mp4">
</video>
___

### Configuração

- Para configurar e executar o projeto em sua máquina, é necessário seguir os seguintes passos após o clone no repositório:
  1. Entrar no prompt do PostgreSQL pelo terminal, e em seguida, criar o banco de dados no PostgreSQL localmente pelo seguinte arquivo DDL abaixo, e conectar no banco criado:
  ```bash
  sudo -i -u postgresql
  psql
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
  4. Rodar os seguintes comandos para instalar os pacotes npm do backend, o nodemon, e mudar o nome do arquivo de ambiente .env, que contem informações sobre o banco de dados, e enfim, rodar a aplicação em outro terminal:
  ```bash
  cd ./server
  npm install
  npm i -g nodemon
  cp -a .env.example .env
  nodemon ./server/index
  ```
