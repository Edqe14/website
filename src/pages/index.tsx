/* eslint-disable @next/next/no-img-element */
import BlurredBackground from '@/components/BlurredBackground';
import Head from '@/components/Head';
import About from '@/components/home/About';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <>
      <Head />
      <BlurredBackground />

      <Hero />
      <About />

      <section className="h-screen"></section>
    </>
  );
}
