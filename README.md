# Laborit Challenge

Este projeto é uma aplicação Node.js que converte consultas em linguagem natural para SQL e executa as consultas em um banco de dados MySQL remoto.

## Funcionalidades

- Converte texto em consultas SQL usando um Modelo de Linguagem (LLM) como OpenAI.
- Executa as consultas SQL em um banco de dados MySQL remoto.
- Retorna os resultados das consultas em formato JSON.

## Requisitos

- Docker
- Docker Compose
- Conta na OpenAI para gerar a API Key

## Configuração do Projeto

### 1. Clonar o Repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/jeanrabelo75/laborit-challenge.git
cd laborit-challenge
```

### 2. Configurar as Variáveis de Ambiente

Copie o arquivo .env.example para um novo arquivo chamado .env na raiz do projeto.

Abra o arquivo .env e preencha as informações necessárias.

### 3. Dockerizar a Aplicação

A aplicação está Dockerizada para garantir consistência em diferentes ambientes. Para rodá-la com Docker, siga os passos abaixo:

#### 3.1. Build da Imagem Docker

Construa a imagem Docker a partir do `Dockerfile`:

```bash
docker build -t laborit-app .
```

#### 3.2. Rodar o Container

Execute o container da aplicação:

```bash
docker-compose up 
```

### 4. Testar a Aplicação

Você pode testar a API usando ferramentas como Postman ou Insomnia. Por exemplo, para enviar uma consulta:

- **Endpoint:** `POST http://localhost:3000/api/query`
- **Corpo da requisição (JSON):**

```json
{
  "query": "Quais são os clientes que moram no Brasil?"
}
```

## Contato

Caso tenha alguma dúvida ou sugestão, entre em contato através do e-mail: ***jrabelo75@hotmail.com***