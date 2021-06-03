import Head from '@components/Head';
import { ReactElement, useState, useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import AboutSelf from '@/components/AboutSelf';
import AboutProjects from '@/components/AboutProjects';

const buildURL = (endpoint?: string) => {
  return `${location.protocol}//${location.host}${endpoint}`;
};

export default function Index(): ReactElement {
  const [texts, setTexts] = useState([]);
  const [about, setAbout] = useState('');

  useEffect(() => {
    (async () => {
      const [fTexts, fAbout] = await Promise.all([
        fetch(buildURL('/api/greeting')).then((res) => res.json()),
        fetch(buildURL('/api/about')).then((res) => res.text()),
      ]);

      setTexts(fTexts);
      setAbout(fAbout);
    })();
  }, []);

  return (
    <>
      <Head />

      <Navbar />
      <Home texts={texts} />
      <AboutSelf text={about} />
      <AboutProjects />
    </>
  );
}
