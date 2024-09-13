FROM node:latest

COPY . /app

WORKDIR /app

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 5173