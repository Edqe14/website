import { ReactElement, useState, useEffect } from 'react';

import Style from '@styles/navbar.module.scss';

const links = [
  ['.Home', '#home'],
  ['.About', '#about'],
  ['.Projects', '#projects'],
  ['.Contact', '#contact'],
];
const activeStyle = {
  color: '#F8C40D',
  fontSize: '1.5rem',
};

const backgroundColors = ['none', '#07060F', '#05040A'];

export default function Navbar(): ReactElement {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const home = document.getElementById('home');
    const aboutSelf = document.getElementById('about');
    const aboutProjects = document.getElementById('projects');

    const homeOffset = home.getBoundingClientRect().top + window.scrollY;
    const aboutSelfOffset =
      aboutSelf.getBoundingClientRect().top + window.scrollY;
    const aboutProjectsOffset =
      aboutProjects.getBoundingClientRect().top + window.scrollY;

    const positions = [homeOffset, aboutSelfOffset, aboutProjectsOffset];
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

      <div className={Style.links}>
        {links.map((v, i) => (
          <a
            href={v[1]}
            key={i}
            style={active === i ? activeStyle : {}}
            onClick={() => setActive(i)}
          >
            {v[0]}
          </a>
        ))}
      </div>
    </nav>
  );
}
