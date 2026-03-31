# Async Todos

## Re-create

```bash
npm i bootstrap --save-dev
npm i sass@1.77.6 -E --save-dev
npm i react-bootstrap
npm i json-server@0.17.4
```

Add the following script to the `"scripts"`-section of package.json:

```json
"server": "json-server --watch data/db.json --port 3000"
```

## Run

Start both client and server in separate terminals.

### Client

```bash
npm run dev
```

### Server

```bash
npm run server
```
