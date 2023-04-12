import ContentLayout from '@/components/ContentLayout';
import Head from '@/components/Head';
import Logo from '@/components/Logo';
import Footer from '@/components/home/Footer';
import useCursor from '@/hooks/useCursor';
import { ArrowLeft, ArrowSquareOut } from '@phosphor-icons/react';
import Link from 'next/link';

const GoBack = () => (
  <Link
    href="/#about"
    className="flex items-center gap-3 mb-8 text-light-gold font-medium"
  >
    <ArrowLeft size={24} />
    Go back • About
  </Link>
);

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 -right-96 lg:right-48 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />
      </section>
    </>
  );
};

export default function About() {
  const cursor = useCursor(({ instance }) => instance);

  return (
    <>
      <Head title="About me" />
      <BlurredBackground />

      <section className="relative p-12 w-screen min-h-screen flex flex-col">
        <Link className="absolute hidden lg:block" href="/">
          <Logo />
        </Link>

        <ContentLayout>
          <GoBack />

          <section className="mb-10 flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <h2 className="font-semibold text-5xl lg:text-6xl tracking-tight block">
              About me
            </h2>
          </section>

          <section className="text-zinc-100 text-lg prose prose-sm prose-pink prose-img:rounded-xl prose-invert">
            <p>
              Hey there! My full name is <b>Joshua Tanri</b>. You can find me
              online with my username <b>Edqe_</b> or <b>Edqe14</b>. I&apos;m a
              Fullstack Web Developer and also somewhat a Designer.
            </p>

            <h2>History</h2>

            <p>
              First time I started to code is around early 2018, where I use
              Javascript to make Discord bots. Then around 2021, I started to
              shift towards web development and{' '}
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noreferrer"
              >
                Typescript
              </a>
              .
            </p>

            <h2>Attachments</h2>

            <section className="not-prose">
              <a
                className="inline-flex items-center gap-3 font-medium border-[2px] bg-zinc-600 bg-opacity-20 hover:bg-opacity-30 border-pale-gold transition-all duration-150 ease-in-out px-3 py-2 rounded-xl text-xl"
                href="/CV.pdf"
                onMouseEnter={() => cursor?.addState('-pointer')}
                onMouseLeave={() => cursor?.removeState('-pointer')}
              >
                Curriculum Vitae
                <ArrowSquareOut size={20} />
              </a>
            </section>
          </section>
        </ContentLayout>
      </section>

      <Footer />
    </>
  );
}
