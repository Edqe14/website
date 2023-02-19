import '@/styles/globals.css';
import 'mouse-follower/dist/mouse-follower.min.css';
import type { AppProps } from 'next/app';

import { Inter, Playfair_Display as Playfair } from '@next/font/google';
import cn from 'classnames';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import useLenis from '@/hooks/useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { raf } from '@studio-freight/tempus';
import MouseFollower from 'mouse-follower';

import Burger from '@/components/Burger';
import useStore from '@/hooks/useStore';
import useCursor from '@/hooks/useCursor';
import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';

const Menu = dynamic(() => import('@/components/Menu'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair({
  subsets: ['latin'],
  variable: '--font-playfair',
});

MouseFollower.registerGSAP(gsap);
gsap.registerPlugin(ScrollTrigger);
gsap.ticker.remove(gsap.updateRoot);

export default function App({ Component, pageProps }: AppProps) {
  const { showMenu, setShowMenu, lockScroll } = useStore();
  const lenisInstance = useLenis(({ instance }) => instance);

  useEffect(() => {
    const unsub = raf.add((time: number) => {
      gsap.updateRoot(time / 1000);
    }, 0);

    return unsub;
  }, []);

  // Lenis
  useEffect(() => {
    const lenis = new Lenis();

    window.history.scrollRestoration = 'manual';
    ScrollTrigger.refresh();
    useLenis.setState({ instance: lenis });

    const unsub = raf.add((time: number) => lenis.raf(time), 0);

    return () => {
      unsub();
      lenis.destroy();
      useLenis.setState({ instance: null });
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) {
      if (lockScroll) {
        lenisInstance.stop();
        document.body.style.setProperty('overflow-y', 'hidden');
        return;
      }

      lenisInstance.start();
      document.body.style.setProperty('overflow-y', 'auto');
    }
  }, [lenisInstance, lockScroll]);

  // Mouse Follower
  useEffect(() => {
    if (isMobile) return;

    const cursor = new MouseFollower({
      stateDetection: {
        '-menu': '.burger,.menu-items',
        '-pointer': 'button',
      },
      textClassName: 'mf-cursor-text text-zinc-800',
    });

    const magnet = import('@/lib/magnetic').then(
      (module) =>
        new module.Magnetic(document.querySelector('.burger') as HTMLElement, {
          x: 0.08,
          y: 0.08,
          s: 0.2,
          rs: 0.7,
        }),
    );

    useCursor.setState({ instance: cursor });

    return () => {
      magnet.then((v) => v.unbind());
      cursor.destroy();
      useCursor.setState({ instance: null });
    };
  }, []);

  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

  return (
    <section
      className={cn(
        inter.variable,
        playfair.variable,
        'font-inter relative overflow-hidden',
      )}
    >
      <Menu />

      <Burger
        opened={showMenu}
        onClick={setShowMenu}
        className="fixed right-12 top-12"
      />

      <Component {...pageProps} />
    </section>
  );
}
