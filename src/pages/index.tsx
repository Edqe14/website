/* eslint-disable @next/next/no-img-element */
import BlurredBackground from '@/components/BlurredBackground';
import Logo from '@/components/Logo';
import useCursor from '@/hooks/useCursor';

export default function Home() {
  const cursor = useCursor(({ instance }) => instance);

  return (
    <>
      <BlurredBackground />

      <section className="p-12 w-screen min-h-screen flex flex-col gap-4">
        <Logo />

        <section className="flex-grow flex flex-col justify-center items-center">
          <section className="flex flex-col gap-12 -translate-y-18">
            <h2 className="text-[9rem] font-semibold tracking-tighter leading-[0.8]">
              REACHING
            </h2>

            <h2 className="text-[9rem] font-semibold tracking-tighter text-light-gold flex items-center leading-[0.8] gap-8 -translate-x-24 z-[2]">
              THE
              <section className="relative flex items-center justify-center select-none ">
                <svg
                  width="300"
                  height="300"
                  className="absolute z-[-1] animate-spin-slow"
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
                  src="https://em-content.zobj.net/source/noto-emoji-animations/344/rocket_1f680.gif"
                  alt=""
                  className="h-28"
                />
              </section>
            </h2>

            <h2 className="text-[9rem] font-semibold tracking-tighter self-end translate-x-24 leading-[0.8]">
              DREAM
            </h2>
          </section>
        </section>
      </section>

      <section className="p-12 w-screen min-h-screen">hi</section>
    </>
  );
}
