/* eslint-disable @next/next/no-img-element */
import Logo from '@/components/Logo';
import useCursor from '@/hooks/useCursor';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import splitText from '@/lib/splitText';
import PageMarker from '@/components/PageMarker';
import { IconArrowDown } from '@tabler/icons';
import Parallax from '@/components/Parallax';

const Link = dynamic(() => import('next/link'), { ssr: false });

export default function Hero() {
  const cursor = useCursor(({ instance }) => instance);

  useEffect(() => {
    const all = gsap.utils.toArray('.hero-text > *');
    const tl = gsap
      .timeline()
      .from('.hero-rocket', {
        scale: 0,
        rotate: 45,
      })
      .from(all, {
        y: 100,
        opacity: 0,
      })
      .to(all, {
        delay: 1,
        duration: 0.8,
        ease: 'power2',
        stagger: 0.075,
        y: 0,
        opacity: 1,
      })
      .to(
        '.hero-rocket',
        {
          duration: 0.8,
          ease: 'back',
          scale: 1,
          rotate: 0,
        },
        '-=0.75',
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="p-12 w-screen min-h-screen flex flex-col gap-4">
      <Link href="/">
        <Logo />
      </Link>

      <section className="flex-grow flex flex-col justify-center items-center relative">
        <section className="flex flex-col gap-6 sm:gap-8 -translate-y-16">
          <Parallax speed={0.5}>
            <section className="overflow-hidden">
              <h2 className="hero-text flex text-6xl sm:text-8xl xl:text-[9rem] font-semibold tracking-tighter leading-[0.8]">
                {splitText('REACHING', { props: { style: { opacity: 0 } } })}
              </h2>
            </section>
          </Parallax>

          <section className="flex items-center gap-8">
            <Parallax speed={0.5} position="top" className="sm:-ml-24 z-[5]">
              <section className="overflow-hidden">
                <h2 className="hero-text text-6xl sm:text-8xl xl:text-[9rem] font-semibold tracking-tighter text-light-gold leading-[0.8]">
                  {splitText('THE', { props: { style: { opacity: 0 } } })}
                </h2>
              </section>
            </Parallax>

            <Parallax speed={0.3} className="z-[2]">
              <section className="hero-rocket relative flex items-center justify-center select-none">
                <svg
                  className="w-48 sm:w-[300px] absolute z-[-1] animate-spin-slow"
                  viewBox="0 0 346 346"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="172"
                    cy="172"
                    r="172"
                    stroke="#6B558D"
                    strokeWidth="1.54255"
                    strokeDasharray="10.09 10.09"
                  />
                </svg>

                <img
                  onMouseEnter={() => cursor?.setText('Rocket!!')}
                  onMouseLeave={() => cursor?.removeText()}
                  src="/assets/images/rocket.gif"
                  alt=""
                  className="h-16 sm:h-28"
                />
              </section>
            </Parallax>
          </section>

          <Parallax
            className="self-end sm:-mr-12 md:-mr-24 z-[1]"
            position="top"
            speed={1.6}
          >
            <section className="overflow-hidden">
              <h2 className="hero-text text-6xl sm:text-8xl xl:text-[9rem] font-semibold tracking-tighter leading-[0.8]">
                {splitText('DREAM', { props: { style: { opacity: 0 } } })}
              </h2>
            </section>
          </Parallax>
        </section>

        <PageMarker />

        <Parallax
          className="absolute bottom-0 right-0"
          speed={0.75}
          fade={false}
        >
          <section className="flex items-center justify-center">
            <span className="w-72 absolute aspect-square border-[2px] border-light-purple border-opacity-60 rounded-full" />
            <IconArrowDown
              size={40}
              className="text-washed-purple"
              strokeWidth={2}
            />
          </section>
        </Parallax>
      </section>
    </section>
  );
}
