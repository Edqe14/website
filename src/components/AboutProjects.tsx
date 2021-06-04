import { Project as Proj } from '@/database/Types';
import Style from '@styles/aboutProjects.module.scss';
import { ReactElement } from 'react';
import Project from './Project';

interface Props {
  projects: Proj[];
}

export default function AboutProjects({ projects }: Props): ReactElement {
  return (
    <section className={Style.container} id='projects'>
      <div className={`${Style.header} scrollEffect`}>
        <h4>Projects —</h4>
        <p>Featured</p>
      </div>

      <div className={`${Style.list} scrollEffect`}>
        {projects.map((p, i) => (
          <div className={Style.center} key={i}>
            <Project {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}
