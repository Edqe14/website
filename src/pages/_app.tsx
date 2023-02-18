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

import { Magnetic } from '@/lib/magnetic';
import Menu from '@/components/Menu';
import useStore from '@/hooks/useStore';
import useCursor from '@/hooks/useCursor';

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
  const { showMenu, setShowMenu } = useStore();

  useEffect(() => {
    const unsub = raf.add((time: number) => {
      gsap.updateRoot(time / 1000);
    }, 0);

    return unsub;
  }, []);

  // Lenis
  useEffect(() => {
    const lenis = new Lenis();

    ScrollTrigger.refresh();
    useLenis.setState({ instance: lenis });

    const unsub = raf.add((time: number) => lenis.raf(time), 0);

    return () => {
      unsub();
      lenis.destroy();
      useLenis.setState({ instance: null });
    };
  }, []);

  // Mouse Follower
  useEffect(() => {
    const cursor = new MouseFollower({
      stateDetection: {
        '-menu': '.menu',
        '-pointer': 'a,button',
      },
      textClassName: 'mf-cursor-text text-zinc-800',
    });

    const magnet = new Magnetic(
      document.querySelector('.menu') as HTMLElement,
      {
        x: 0.08,
        y: 0.08,
        s: 0.2,
        rs: 0.7,
      },
    );

    useCursor.setState({ instance: cursor });

    return () => {
      magnet.unbind();
      cursor.destroy();
      useCursor.setState({ instance: null });
    };
  }, []);

  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

  return (
    <section
      className={cn(inter.variable, playfair.variable, 'font-inter relative')}
    >
      <Menu
        opened={showMenu}
        onClick={setShowMenu}
        className="fixed right-12 top-12"
      />

      <Component {...pageProps} />
    </section>
  );
}
