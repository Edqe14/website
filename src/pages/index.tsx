/* eslint-disable @next/next/no-img-element */
import BlurredBackground from '@/components/BlurredBackground';
import Head from '@/components/Head';
import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';

import { Project, allProjects } from 'contentlayer/generated';

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <>
      <Head />
      <BlurredBackground />

      <Hero />
      <About />
      <Projects projects={projects} />
    </>
  );
}

export const getStaticProps = async () => {
  const projects = allProjects;

  return {
    props: {
      projects,
    },
  };
};
