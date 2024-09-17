# Poke Wizard

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