FROM node:latest

COPY . /app

WORKDIR /app

RUN npm i -g serve

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist"]
