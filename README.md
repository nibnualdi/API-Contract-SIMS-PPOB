## How to run the app:
**Make an `.env` file. Please use the [`.env.example`](.env.example) as the reference.**
*Also make sure you got your mysql run*
```
npm install
npm run createdb
npm run migrate:up
npm run seed:up
```

**Run this code:**
```
npm run dev
```

**See the API documentation [`http://localhost:3000/api-docs/`](http://localhost:3000/api-docs/).**