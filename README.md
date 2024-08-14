# Laborit Challenge

Este projeto é uma aplicação Node.js que converte consultas em linguagem natural para SQL e executa as consultas em um banco de dados MySQL remoto.

## Funcionalidades

- Converte texto em consultas SQL usando um Modelo de Linguagem (LLM) como OpenAI.
- Executa as consultas SQL em um banco de dados MySQL remoto.
- Retorna os resultados das consultas em formato JSON.

## Requisitos

- [Docker](https://runnable.com/docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- [Node JS](https://nodejs.org/en/download/)

## Configuração do Projeto

### 1. Repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/jeanrabelo75/laborit-challenge.git
cd laborit-challenge
```

### 2. Variáveis de Ambiente

Copie o arquivo .env.example para um novo arquivo chamado .env na raiz do projeto.

Abra o arquivo .env e preencha as informações necessárias.

### 3. Docker

A aplicação está utilizando Docker para garantir consistência em diferentes ambientes. Para rodá-la, siga o passo abaixo:

#### 3.1. Rodar o Container já com a build da Imagem

```bash
docker-compose up --build
```

### 4. Aplicação

Você pode testar a API usando ferramentas como Postman ou Insomnia. Por exemplo, para enviar uma consulta:

- **Endpoint:** `POST http://localhost:3000/api/query`
- **Corpo da requisição (JSON):**
- **LLMs disponíveis:** `groq, openapi, google, amazon`

```json
{
  "query": "Qual é o volume de vendas por cidade?",
  "llm": "groq"
}
```

## Contato

Caso tenha alguma dúvida ou sugestão, entre em contato através do e-mail: ***jrabelo75@hotmail.com***

## Considerações

Neste projeto, eu implementei o desafio de usar uma LLM para criar uma ferramenta de Text-to-SQL. Ou seja, passar uma consulta em linguagem natural para comandos SQL válidos e que podem ser rodados em um banco de dados.

Eu utilizei ***Docker*** e ***Docker Compose*** para facilitar o setup e a execução da aplicação.

Os LLMs foram incorporados ao projeto de duas maneiras: 

- ***Groq***: para Groq, usei o pacote oficial fornecido para interagir com sua API. No entanto, os resultados dessa LLM em particular eram inferiores aos de suas contrapartes.
- ***OpenAI***, ***Google*** e ***Amazon***: para o resto, usei a API de EdenAI, que oferece uma API unificada para uma grande lista de modelos LLM. Usando a API de EdenAI, eu era capaz de acessar modelos dos três provedores onde o melhor método foi por meio do Google.

Ambas as implementações requerem chaves de API (API_KEYS), que são facilmente obtidas nos respectivos sites:

- [EdenAI](https://www.edenai.co/)
- [Groq](https://groq.com/)

Para garantir que as LLMs tinham contexto suficiente sobre a estrutura do banco de dados, implementei uma função que recupera todas as informações e tabelas do banco de dados e as transmite para a LLM antes da geração do SQL. Isso garantirá que as consultas geradas tenham a maior precisão possível. 

Uma opção adicional nesta linha seria o Fine Tuning das LLMs, ou seja, ajustar o modelo para trabalhar com o esquema do banco de dados, o que deve tornar a precisão das consultas ainda melhor. 

Eu escrevi testes unitários especialmente para as funções localizadas na pasta utils usando Mocha e Chai. O objetivo desses testes era garantir que as funções críticas de formatação de dados e de manipulação de formato de texto estavam funcionando corretamente.