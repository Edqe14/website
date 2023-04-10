import { allProjects } from 'contentlayer/generated';
import type { Project } from 'contentlayer/generated';
import { GetStaticProps } from 'next';

export const getStaticPaths = () => {
  const paths = allProjects.map((p) => `/projects/${p.name.toLowerCase()}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const project = allProjects.find(
    (p) =>
      // eslint-disable-next-line no-underscore-dangle
      p._raw.flattenedPath ===
      `projects/${(params?.slug as string).toLowerCase()}`,
  );
  return {
    props: {
      project,
    },
  };
};

export default function Project({ project }: { project: Project }) {
  console.log(project);

  return (
    <section className="relative p-12 w-screen min-h-screen flex flex-col">
      <h1>{project.name}</h1>
    </section>
  );
}
