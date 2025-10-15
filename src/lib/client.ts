import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { MmkvStorage } from '../core/storage';
import{createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';

const MmkvPersister = createSyncStoragePersister({
    storage: MmkvStorage
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, 
      staleTime: 1000 * 60 * 5, 
      retry: 2,
    },
  },
});

persistQueryClient({
  queryClient,
  persister: MmkvPersister,
  maxAge: 1000 * 60 * 60 * 24, 
  buster: 'v1', 
});