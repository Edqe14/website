import { Project } from 'contentlayer/generated';
import { IconArrowNarrowRight } from '@tabler/icons';
import Link from 'next/link';
import PageMarker from '../PageMarker';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      className="relative p-12 w-screen min-h-screen flex flex-col"
    >
      <section className="relative flex-grow flex flex-col">
        <li className="text-gold font-semibold list-disc mb-4">
          SELECTED WORKS
        </li>

        <section className="grid grid-cols-[2fr_1fr] gap-4 flex-grow">
          <section className="divide-y-2">
            {projects.map((project) => (
              <Link
                // eslint-disable-next-line no-underscore-dangle
                key={project._id}
                // eslint-disable-next-line no-underscore-dangle
                href={`/${project._raw.flattenedPath}`}
              >
                <article className="group grid grid-cols-3 items-center relative px-8 py-6 cursor-pointer after:z-[-1] after:absolute after:h-full after:inset-y-0 after:right-0 after:w-0 hover:after:left-0 after:bg-zinc-100 hover:after:w-full after:transition-all after:duration-200 after:ease-in-out">
                  <h2 className="text-3xl font-medium group-hover:text-pale-purple tracking-tight">
                    {project.name}
                  </h2>

                  <p className="text-light-gold font-semibold font-playfair text-2xl">
                    {project.year}
                  </p>

                  <p className="flex gap-3 items-center font-medium text-pale-purple justify-self-end">
                    View project
                    <IconArrowNarrowRight />
                  </p>
                </article>
              </Link>
            ))}
          </section>
        </section>

        <PageMarker page={3} text="PROJECTS" />
      </section>
    </section>
  );
}
