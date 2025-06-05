import { api } from '@/lib/axios';
import type { Engineer } from '@/types/user';
import {create} from 'zustand';

interface ManagerState {
  engineers: Engineer[];
  loading: boolean;
  error?: null | undefined | string;
  fetchEngineers: () => Promise<void>;

}
const useManagerStore = create<ManagerState>((set) => ({
  engineers: [],
  loading: false,
  error: null,

  fetchEngineers: async () => {
    set({ loading: true, error: null })
    try {
      const res = await api.get("/engineers");
      console.log("Engineers fetched:", res.data)
      set({ engineers: res.data.data, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch engineers",
        loading: false,
      });
    }
  },
}))


export default useManagerStore;