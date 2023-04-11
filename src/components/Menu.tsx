import useStore from '@/hooks/useStore';
import { createRef, useEffect } from 'react';
import gsap from 'gsap';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';
import { useRouter } from 'next/router';
import useLenis from '@/hooks/useLenis';

const routes = {
  Home: '#',
  About: '#about',
  Projects: '#projects',
  Contact: '#footer',
  Blog: '/blog',
};

export default function Menu() {
  const [open, setShow] = useStore(
    ({ showMenu, setShowMenu }) => [showMenu, setShowMenu],
    shallow,
  );
  const ref = createRef<HTMLDivElement>();
  const router = useRouter();
  const lenis = useLenis(({ instance }) => instance);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap
      .timeline()
      .to('.menu-items', {
        duration: 0.5,
        opacity: open ? 1 : 0,
        y: open ? 0 : 50,
        ease: 'power2',
      })
      .to(
        el,
        {
          duration: 0.5,
          ease: 'power2',
          x: open ? 0 : '100%',
        },
        0,
      );

    return () => {
      tl.kill();
    };
  }, [open, ref]);

  return (
    <>
      {/* Overlay */}
      <section
        onClick={() => setShow(false)}
        className={classNames(
          'z-10 fixed inset-0 w-full h-full bg-zinc-800 transition-opacity duration-500 ease-expo cursor-pointer',
          open
            ? 'pointer-events-auto opacity-40'
            : 'pointer-events-none opacity-0',
        )}
      />

      <section
        ref={ref}
        className="fixed inset-0 ml-auto sm:max-w-2xl px-16 sm:px-24 pb-16 pt-36 bg-primary-dark z-20"
        style={{
          transform: 'translateX(100%)',
        }}
      >
        <section className="menu-inner flex flex-col h-full justify-between">
          <section
            className="menu-content flex flex-col gap-3 hover:text-pale-purple"
            data-cursor="-opaque"
          >
            {Object.entries(routes).map(([name, route]) => (
              <section
                key={name}
                className="menu-items cursor-pointer relative group hover:text-white transition-colors duration-100 ease-expo"
              >
                <p
                  onClick={async (ev) => {
                    ev.preventDefault();
                    setShow(false);

                    if (route.startsWith('#')) {
                      if (router.pathname !== '/') {
                        const query: Record<string, string> = {};

                        if (route !== '#') {
                          query.scroll = route.slice(1);
                        }

                        return router.push({
                          pathname: '/',
                          query,
                        });
                      }

                      let target: string | number = `[data-id=${route.slice(
                        1,
                      )}]`;

                      if (route === '#') {
                        target = 0;
                      }

                      return lenis?.scrollTo(target, {
                        duration: 1,
                      });
                    }

                    router.push(route);
                  }}
                  className="block pb-3 border-b text-4xl transition-all duration-300 ease-expo border-transparent group-hover:px-3 group-hover:border-pale-gold"
                >
                  {name}
                </p>
              </section>
            ))}
          </section>

          <section>
            <p className="opacity-75">(≧ω≦)</p>
          </section>
        </section>
      </section>
    </>
  );
}
