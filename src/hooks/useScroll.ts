import { useEffect } from 'react';
import useLenis from './useLenis';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useScroll(callback: () => void, deps?: any[]) {
  const lenis = useLenis(({ instance }) => instance);

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', callback);

    return () => {
      lenis.off('scroll', callback);
    };
  }, [lenis, callback, deps]);
}
