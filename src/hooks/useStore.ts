import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useStore = create(
  combine(
    {
      showMenu: false,
      lockScroll: false,
    },
    (set) => ({
      setShowMenu: (showMenu: boolean) => set({ showMenu }),
      toggleShowMenu: () => set((state) => ({ showMenu: !state.showMenu })),
      setLockScroll: (lockScroll: boolean) => set({ lockScroll }),
    }),
  ),
);

export default useStore;
