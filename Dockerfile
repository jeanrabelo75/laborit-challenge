FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev nodemon

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "-L"]
