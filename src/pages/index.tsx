import Head from '@components/Head';
import { ReactElement, useState, useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import AboutSelf from '@/components/AboutSelf';
import AboutProjects from '@/components/AboutProjects';
import Footer from '@/components/Footer';
import useWindowSize from '@/hooks/useWindowSize';
import { Contact } from '@/database/Types';
import buildURL from '@/hooks/buildURL';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
const data = {
  ease: 0.1,
  current: 0,
  previous: 0,
  rounded: 0,
};

export default function Index(): ReactElement {
  const [texts, setTexts] = useState([]);
  const [about, setAbout] = useState('');
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});

  useEffect(() => {
    (async () => {
      const [fTexts, fAbout, fProjects, fContact] = await Promise.all([
        fetch(buildURL('/api/greeting')).then((res) => res.json()),
        fetch(buildURL('/api/about')).then((res) => res.text()),
        fetch(buildURL('/api/projects')).then((res) => res.json()),
        fetch(buildURL('/api/contact')).then((res) => res.json()),
      ]);

      setTexts(fTexts);
      setAbout(fAbout);
      setProjects(fProjects);
      setContact(fContact);
    })();
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  const skewScrolling = () => {
    //Set Current to the scroll position amount
    data.current = window.scrollY;
    // Set Previous to the scroll previous position
    data.previous += (data.current - data.previous) * data.ease;
    // Set rounded to
    data.rounded = Math.round(data.previous * 100) / 100;

    // Difference between
    const difference = data.current - data.rounded;
    const acceleration = difference / useWindowSize().width;
    const velocity = +acceleration;
    const skew = clamp(velocity * 7.5, -10, 10);

    //Assign skew and smooth scrolling to the scroll container
    const parallax = document.querySelectorAll('.parallax');
    parallax.forEach(
      (e: HTMLElement) =>
        (e.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`)
    );

    const scroll = document.querySelectorAll('.scrollEffect');
    scroll.forEach(
      (e: HTMLElement) => (e.style.transform = `skewY(${skew}deg)`)
    );

    //loop vai raf
    requestAnimationFrame(() => skewScrolling());
  };

  return (
    <>
      <Head />

      <Navbar />
      <Home texts={texts} />
      <AboutSelf text={about} />
      <AboutProjects projects={projects} />

      <Footer {...(contact as Contact)} />
    </>
  );
}
