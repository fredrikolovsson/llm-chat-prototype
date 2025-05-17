import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { createRoutes } from './routes/index.js';

const app = express();

// 1) Setup CORS
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

createRoutes(app);

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
