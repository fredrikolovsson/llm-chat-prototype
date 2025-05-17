import { type Router } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppRouter, appRouter } from './appRouter/index.js';

export const createTrpcRoutes = (app: Router) => {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware<AppRouter>({
      router: appRouter,
      createContext: () => ({}),
    }),
  );
};
