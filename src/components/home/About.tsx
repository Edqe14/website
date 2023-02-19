import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

import Ricefield from '@/assets/ricefield.jpg';
import PageMarker from '../PageMarker';

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (
      !roleRef.current ||
      !targetRef.current ||
      !introRef.current ||
      !fromRef.current
    )
      return;

    const tl = gsap
      .timeline({
        scrollTrigger: {
          id: 'about-root',
          trigger: targetRef.current,
          pin: true,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to(roleRef.current, {
        id: 'role',
        scale: 1,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: 'top top',
          end: '+=100%',
        },
      })
      .to(introRef.current, {
        id: 'intro',
        y: 0,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '20% top',
          end: '+=100%',
        },
      })
      .to(fromRef.current, {
        id: 'from',
        y: 0,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '20% top',
          end: '+=100%',
        },
      })
      .to('#about-image-1', {
        id: 'image-1',
        rotate: -6,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '25% top',
          end: 'bottom top',
        },
      });

    return () => {
      tl.kill();
    };
  }, [roleRef, targetRef, introRef, fromRef]);

  return (
    <section
      id="about"
      className="relative p-12 w-screen min-h-screen flex flex-col"
    >
      <section className="relative h-full w-full flex-grow flex flex-col items-center justify-center">
        <section className="h-[200vh] w-full">
          <section
            ref={targetRef}
            className="h-screen flex items-center justify-center"
          >
            <section className="w-min gap-4 flex flex-col justify-center">
              <section className="overflow-hidden ml-28">
                <h2
                  ref={introRef}
                  className="text-3xl sm:text-4xl xl:text-5xl font-medium tracking-tighter leading-[0.8]"
                  style={{ transform: 'translateY(100%)' }}
                >
                  I&apos;M A
                </h2>
              </section>

              <section
                ref={roleRef}
                className=""
                style={{ transform: 'scaleX(3) scaleY(2)' }}
              >
                <h2 className="whitespace-nowrap text-6xl sm:text-8xl xl:text-[7.5rem] font-medium tracking-tighter leading-[0.8]">
                  WEB DEVELOPER
                </h2>
              </section>

              <section className="overflow-hidden self-end">
                <h2
                  ref={fromRef}
                  className="text-4xl sm:text-5xl xl:text-6xl font-medium tracking-tighter leading-[0.8]"
                  style={{ transform: 'translateY(-100%)' }}
                >
                  FROM INDONESIA
                </h2>
              </section>
            </section>

            <section
              id="about-image-1"
              className="absolute z-[-1] left-40"
              style={{
                transform: 'rotate(-2deg) translateY(50px) scale(0.75)',
                opacity: 0,
              }}
            >
              <Image
                src={Ricefield}
                width={720}
                height={1080}
                alt=""
                placeholder="blur"
                className="w-64 rounded-md mb-2"
              />

              <p className="font-playfair text-pale-gold font-medium">
                Oro Oro Ondo
              </p>
            </section>
          </section>
        </section>

        <PageMarker page={2} text="ABOUT" />
      </section>
    </section>
  );
}
