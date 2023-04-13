import { Project } from 'contentlayer/generated';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import useCursor from '@/hooks/useCursor';
import PageMarker from '../PageMarker';

export default function Projects({ projects }: { projects: Project[] }) {
  const cursor = useCursor(({ instance }) => instance);

  return (
    <section
      id="projects"
      className="relative p-12 w-screen min-h-screen flex flex-col"
    >
      <section className="relative flex-grow flex flex-col">
        <li className="text-light-gold font-semibold list-disc mb-4">
          SELECTED WORKS
        </li>

        <section className="grid lg:grid-cols-[2fr_1fr] gap-8 flex-shrink-0 flex-grow mb-16">
          <section className="divide-y divide-pale-gold mb-4 sm:mb-0 -mx-5 sm:mx-0">
            {projects.map((project) => (
              <Link
                className="block"
                // eslint-disable-next-line no-underscore-dangle
                key={project._id}
                // eslint-disable-next-line no-underscore-dangle
                href={`/${project._raw.flattenedPath}`}
              >
                <article className="group grid grid-cols-3 items-center relative px-6 sm:px-8 py-6 cursor-pointer after:z-[-1] after:absolute after:h-full after:inset-y-0 after:right-0 after:w-0 hover:after:left-0 after:bg-zinc-100 hover:after:w-full after:transition-all after:duration-200 after:ease-in-out">
                  <section>
                    <h2 className="text-3xl font-medium group-hover:text-pale-purple tracking-tight">
                      {project.name}
                    </h2>

                    <p className="text-light-gold block sm:hidden justify-self-center md:justify-self-start font-medium text-xl">
                      {project.year}
                    </p>
                  </section>

                  <p className="text-light-gold opacity-0 sm:opacity-100 justify-self-center md:justify-self-start font-medium text-xl tracking-tight">
                    {project.year}
                  </p>

                  <p className="flex gap-3 items-center font-medium text-light-purple justify-self-end">
                    <span className="hidden sm:block">View project</span>
                    <ArrowRight size={24} strokeWidth={3} />
                  </p>
                </article>
              </Link>
            ))}
          </section>

          <section className="grid place-items-center select-none">
            <a
              href="https://github.com/edqe14"
              target="_blank"
              rel="noreferrer"
              className="animate-hover p-8 w-52 md:w-72 rounded-xl text-zinc-800 flex-col flex justify-center items-center aspect-[10/16] bg-purple-100 mb-16 will-change-transform"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-[8.5rem] md:text-[11rem] mb-8"
              />

              <h2 className="font-semibold text-lg md:text-xl text-center">
                Find more on my Github!
              </h2>
            </a>
          </section>
        </section>

        <PageMarker page={3} text="PROJECTS" />
      </section>
    </section>
  );
}
