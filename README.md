# Poke Wizard

## Setup

To run the app, you need to create a `.env` file in the root of the project with the following:

```bash
VITE_BASE_API_URL=https://pokeapi.co/api/v2
```

## Dev environment

To run the development server:

```bash
npm run dev
```

This will start the development server on port 8080.

## Production environment

To build the production version:

```bash
npm run build
```
This will first compile the typescript code and then bundle the react app into 
a production ready version inside the `dist` folder.

To run the production ready version:

```bash
npm install -g serve
serve -s dist
```

this will start a local server and serve the app on port 3000.

## Docker

To build the docker image:

```bash
docker build -t poke-wizard .
```

To run the docker container:

```bash
docker run -dp 3000:3000 poke-wizard
```

This will start the docker container in detached mode and serve the app on port 3000.
