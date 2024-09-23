/* eslint-disable @next/next/no-img-element */
import Logo from '@/components/Logo';
import useCursor from '@/hooks/useCursor';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import PageMarker from '@/components/PageMarker';
import { ArrowDown } from '@phosphor-icons/react';
import { Emoji } from '../Twemoji';

const Link = dynamic(() => import('next/link'), { ssr: false });

export default function Hero() {
  const cursor = useCursor(({ instance }) => instance);

  useEffect(() => {
    const greetingAll = gsap.utils.toArray('#hero-greeting *');
    const nameAll = gsap.utils.toArray('#hero-name *');
    const greeting2All = gsap.utils.toArray('#hero-greeting2 *');

    const tl = gsap
      .timeline({
        paused: true,
        delay: 1,
      })
      .to(greetingAll, {
        opacity: 1,
        stagger: 0.2,
      })
      .to(
        nameAll,
        {
          opacity: 1,
          stagger: 0.15,
        },
        '+=0.2',
      )
      .to(
        greeting2All,
        {
          opacity: 1,
          stagger: 0.15,
        },
        '+=0.2',
      );

    requestAnimationFrame(() => {
      tl.play();
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="p-12 w-screen min-h-screen flex flex-col gap-4">
      <Link href="/">
        <Logo />
      </Link>

      <section className="flex-grow flex flex-col relative">
        <section className="flex flex-col sm:pl-[12vw] pt-[15vh] gap-4">
          <p
            className="text-xl sm:text-2xl font-medium flex flex-shrink-0 flex-grow-0 gap-2"
            id="hero-greeting"
          >
            <span style={{ opacity: 0 }}>Hey</span>
            <span style={{ opacity: 0 }}>there!</span>
            <Emoji code="1f44b" style={{ opacity: 0 }} />
          </p>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-semibold ml-[-5px] text-light-gold flex flex-shrink-0 flex-grow-0 gap-4 tracking-tight"
            id="hero-name"
          >
            <span style={{ opacity: 0 }}>I&apos;m</span>
            <span
              style={{ opacity: 0 }}
              className="font-bold text-white flex flex-col relative"
              // onMouseEnter={() =>
              //   cursor?.setText(
              //     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M160,32V224a8,8,0,0,1-12.91,6.31L77.25,176H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H77.25l69.84-54.31A8,8,0,0,1,160,32Zm32,64a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V104A8,8,0,0,0,192,96Zm32-16a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,224,80Z"/></svg>',
              //   )
              // }
              // onMouseLeave={() => cursor?.removeText()}
              // onClick={() => {
              //   const audio = new Audio('./assets/audio/edqe.mp3');
              //   audio.play();
              // }}
            >
              <span className='text-lg tracking-tighter opacity-80 absolute -bottom-6 right-1'><span className='opacity-75'>a.k.a</span> Edqe14</span>

              Yuka
            </span>
            <span style={{ opacity: 0 }}>.</span><br />
          </h1>

          <p
            className="text-xl sm:text-2xl font-medium flex flex-shrink-0 flex-grow-0 gap-2 text-zinc-100"
            id="hero-greeting2"
          >
            <span style={{ opacity: 0 }}>Welcome</span>
            <span style={{ opacity: 0 }}>to</span>
            <span style={{ opacity: 0 }}>my</span>
            <span style={{ opacity: 0 }}>site!</span>
          </p>
        </section>

        <PageMarker />

        <section className="absolute bottom-0 right-0">
          <section className="flex items-center justify-center">
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

            <ArrowDown
              size={40}
              className="text-washed-purple"
              strokeWidth={2}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
