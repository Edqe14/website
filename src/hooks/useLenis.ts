import Lenis from '@studio-freight/lenis';
import { create } from 'zustand';

const useLenis = create(() => ({
  instance: null as Lenis | null,
}));

export default useLenis;
