FROM node:latest

COPY . /app

WORKDIR /app

RUN npm i -g serve

RUN npm install

RUN npm run build


ENV VITE_BASE_API_URL=https://pokeapi.co/api/v2/

CMD ["serve", "-s", "dist"]
