/**
 * This is the client-side code that uses the inferred types from the server
 */
import {
  createTRPCClient,
  httpBatchStreamLink,
  httpSubscriptionLink,
  splitLink,
} from '@trpc/client';
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */
import type { AppRouter } from '../../../server/src/routes/trpc/appRouter/index.js';
import { transformer } from '../../../server/src/routes/trpc/transformer/index.js';

// Initialize the tRPC client
export const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === 'subscription',
      true: httpSubscriptionLink({
        url: 'http://localhost:3000/trpc',
        transformer,
      }),
      false: httpBatchStreamLink({
        url: 'http://localhost:3000/trpc',
        transformer,
      }),
    }),
  ],
});