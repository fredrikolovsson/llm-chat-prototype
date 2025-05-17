import { type Router } from 'express';
import { createTrpcRoutes } from './trpc/index.js';

export const createRoutes = (app: Router) => {
  createTrpcRoutes(app);
};
