import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import createGlobe from 'cobe';
import mapRange from '@/lib/mapRange';
import PageMarker from '../PageMarker';
import { Emoji } from '../Twemoji';

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phi = useRef(1.2);

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
          id: 'about-container',
          trigger: '#about',
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      })
      .to(roleRef.current, {
        id: 'role',
        y: 0,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '-800 top',
          end: '+=60%',
        },
      })
      .to(introRef.current, {
        id: 'intro',
        y: 0,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '-750 top',
          end: '+=60%',
        },
      })
      .to(fromRef.current, {
        id: 'from',
        // y: 0,
        x: 0,
        ease: 'power2',
        scrollTrigger: {
          trigger: targetRef.current,
          scrub: true,
          start: '-750 top',
          end: '+=50%',
        },
      });

    return () => {
      tl.kill();
    };
  }, [roleRef, targetRef, introRef, fromRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const instance = ScrollTrigger.getById('about-container');

    const updatePhi = () => {
      if (!instance) return;

      const { progress } = instance;

      phi.current = mapRange(0, 1, progress, 1.2, 3.8);
    };

    const applyClass = () => {
      if (!canvasRef.current) return;

      canvasRef.current.style.webkitMaskImage =
        '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));';
      canvasRef.current.style.maskImage =
        'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))';
    };

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1.5,
      width: 384 * 1.5,
      height: 384 * 1.5,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [255 / 255, 61 / 255, 50 / 255],
      glowColor: [1, 1, 1],
      opacity: 0.7,
      markers: [
        // longitude latitude
        { location: [-0.035309, 109.296531], size: 0.05 },
      ],
      onRender: (state) => {
        updatePhi();

        // eslint-disable-next-line no-param-reassign
        state.phi = phi.current;
      },
    });

    return () => {
      globe.destroy();
      applyClass();
    };
  }, []);

  return (
    <section
      id="about"
      className="relative p-12 w-screen min-h-[80vh] flex flex-col"
    >
      <section className="relative flex-grow flex flex-col items-center pt-36">
        <section id="about-scroll-container" className="w-full">
          <section ref={targetRef} className="flex items-center justify-center">
            <section className="w-min gap-4 flex flex-col justify-center -mt-16">
              <section className="overflow-hidden ml-12 sm:ml-28">
                <h2
                  ref={introRef}
                  className="text-3xl md:text-4xl xl:text-5xl font-medium tracking-tighter leading-[0.8]"
                  style={{ transform: 'translateY(100%)' }}
                >
                  I&apos;M A
                </h2>
              </section>

              <section className="overflow-hidden">
                <h2
                  style={{ transform: 'translateY(100%)' }}
                  ref={roleRef}
                  className="whitespace-nowrap text-[42px] md:text-8xl xl:text-[7.5rem] font-semibold tracking-tighter leading-[0.8]"
                >
                  WEB DEVELOPER
                </h2>
              </section>

              <section className="overflow-hidden self-end">
                <h2
                  ref={fromRef}
                  className="text-3xl md:text-5xl xl:text-6xl font-medium tracking-tighter flex items-center leading-[0.8] pr-[2px]"
                  style={{ transform: 'translateX(100%)' }}
                >
                  <Emoji code="1f1ee-1f1e9" />
                  FROM INDONESIA
                </h2>
              </section>
            </section>

            <canvas
              ref={canvasRef}
              className="w-[384px] h-[384px] scale-[1.3] md:scale-[1.8] aspect-square absolute bottom-28 lg:bottom-40 left-1/2 -translate-x-1/2 z-[-1] opacity-70"
              style={{
                maskImage:
                  'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
                WebkitMaskImage:
                  '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
              }}
            />
          </section>
        </section>

        <PageMarker page={2} text="ABOUT" />
      </section>
    </section>
  );
}
