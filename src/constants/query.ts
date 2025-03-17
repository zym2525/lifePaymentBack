import { QueryClient } from '@tanstack/vue-query';

export const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
