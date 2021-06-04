import { ReactElement, useState, useEffect, createRef, RefObject } from 'react';

import Style from '@styles/navbar.module.scss';

const links = [
  ['.Home', '#home'],
  ['.About', '#about'],
  ['.Projects', '#projects'],
  ['.Contact', '#contact'],
];

const backgroundColors = ['none', '#07060F', '#05040A', '#07060F'];

export default function Navbar(): ReactElement {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const linksRel = createRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    const handler = () => {
      const current = linksRel.current;
      if (
        !window.matchMedia('only screen and (max-width: 980px)').matches &&
        current &&
        current.classList.contains('hidden')
      )
        current.classList.remove('hidden');
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [linksRel]);

  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect((): any => {
    if (timer) clearTimeout(timer);
    if (!window.matchMedia('only screen and (max-width: 980px)').matches)
      return;

    const current = linksRel.current;
    if (!current) return;
    if (show) {
      current.classList.remove('hidden');
      return (timer = setTimeout(
        () => current.classList.add(Style.active),
        300
      ));
    }

    current.classList.remove(Style.active);
    return (timer = setTimeout(() => current.classList.add('hidden'), 200));
  }, [show]);

  useEffect(() => {
    const home = document.getElementById('home');
    const aboutSelf = document.getElementById('about');
    const aboutProjects = document.getElementById('projects');
    const contact = document.getElementById('contact');

    const homeOffset = home.getBoundingClientRect().top;
    const aboutSelfOffset = aboutSelf.getBoundingClientRect().top;
    const aboutProjectsOffset = aboutProjects.getBoundingClientRect().top;
    const contactOffset = contact.getBoundingClientRect().top;

    const positions = [
      homeOffset,
      aboutSelfOffset,
      aboutProjectsOffset,
      contactOffset,
    ];
    const navbar = document.getElementById('navbar');

    const listener = () => {
      const scrollY = window.scrollY;
      let num = 0;
      positions.forEach((n) => (n <= scrollY ? (num = n) : null));

      const index = positions.indexOf(num);
      if (navbar.style.background !== backgroundColors[index]) {
        navbar.style.background = backgroundColors[index];
        setActive(index);
      }
    };

    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, []);

  return (
    <nav className={Style.container} id='navbar'>
      <h1>Edqe</h1>

      <div
        className={`${Style.background}${show ? ` ${Style.active}` : ''}`}
      ></div>

      <div ref={linksRel} className={Style.links}>
        {links.map((v, i) => (
          <a
            href={v[1]}
            key={i}
            className={active === i ? Style.highlight : ''}
            onClick={() => setShow(false)}
          >
            {v[0]}
          </a>
        ))}
      </div>

      <div
        className={`${Style.menu}${show ? ` ${Style.active}` : ''}`}
        onClick={() => setShow(!show)}
      >
        <div className={Style.bar}></div>
        <div className={Style.bar}></div>
        <div className={Style.bar}></div>
      </div>
    </nav>
  );
}
