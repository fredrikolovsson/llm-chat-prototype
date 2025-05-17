# server

A Node.js Express server written in TypeScript that connects to a Supabase database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root of `server` with your Supabase credentials:
   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-anon-key
   ```

## Development

Start the server in development mode (with hot reload):
```bash
npm run dev
```

## Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

## Production

Start the compiled server:
```bash
npm start
```

## Linting & Formatting

- Lint code:
  ```bash
  npx eslint src --ext .ts
  ```
- Format code:
  ```bash
  npx prettier --write src
  ```