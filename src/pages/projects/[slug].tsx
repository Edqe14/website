import ContentLayout from '@/components/ContentLayout';
import ContentMDX from '@/components/ContentMDX';
import Head from '@/components/Head';
import { ArrowLeft } from '@phosphor-icons/react';
import { allProjects } from 'contentlayer/generated';
import type { Project } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export const getStaticPaths = () => {
  // eslint-disable-next-line no-underscore-dangle
  const paths = allProjects.map((p) => `/${p._raw.flattenedPath}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const project = allProjects.find(
    (p) =>
      // eslint-disable-next-line no-underscore-dangle
      p._raw.flattenedPath === `projects/${params?.slug as string}`,
  );

  return {
    props: {
      project,
    },
  };
};

const GoBack = () => (
  <Link
    href="/#projects"
    className="flex items-center gap-3 mb-8 text-light-gold font-medium"
  >
    <ArrowLeft size={24} />
    Go back • Projects
  </Link>
);

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 -right-96 lg:right-48 animate-spin-slow absolute bg-gradient-to-b from-[#FF375B] via-[#92E0A8] to-[#4440F0]"
        />

        <span
          id="blob-2"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />

        <span
          id="blob-3"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[200vh] -right-56 md:right-0 animate-spin-slow absolute bg-gradient-to-b from-[#37E7FF] via-[#E0CE92] to-[#F040BF]"
        />
      </section>
    </>
  );
};

export default function Project({ project }: { project: Project }) {
  return (
    <>
      <Head title={`Projects • ${project.name}`} />
      <BlurredBackground />

      <section className="relative p-12 w-screen min-h-screen flex flex-col">
        <ContentLayout>
          <GoBack />

          <section className="mb-10 flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-5xl lg:text-6xl tracking-tight block"
            >
              {project.name}
            </a>

            {typeof project.year === 'number' && (
              <section className="flex gap-3 justify-end">
                <p className="text-3xl text-light-gold">•</p>

                <p className="text-2xl font-medium text-zinc-300">
                  {project.year}
                </p>
              </section>
            )}
          </section>

          <section className="text-zinc-100 text-lg prose prose-sm prose-amber prose-img:rounded-xl prose-invert">
            <ContentMDX code={project.body.code} />
          </section>
        </ContentLayout>
      </section>
    </>
  );
}
