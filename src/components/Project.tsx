import { Project as Proj } from '@/database/Types';
import Style from '@styles/project.module.scss';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useState,
} from 'react';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faDiscord,
  faNpm,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props
  extends Proj,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const icons = {
  github: faGithub,
  web: faExternalLinkAlt,
  discord: faDiscord,
  npm: faNpm,
  twitter: faTwitter,
};

export default function Project(props: Props): ReactElement {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${Style.container} ${props.className}`}
      style={{
        background: hovered
          ? 'none'
          : `linear-gradient(225deg, ${props.gradient[0]} 0%, ${props.gradient[1]} 100%)`,
        color: hovered ? '#F9F9F9' : '#07060F',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        const a = document.createElement('a');
        a.href = props.url;
        a.rel = 'noopener noreferrer nofollow';
        a.target = '_blank';
        a.click();
      }}
    >
      <ul className={Style.icons}>
        {props.icons.map((t, i) =>
          icons[t] ? (
            <FontAwesomeIcon className={Style.icon} icon={icons[t]} key={i} />
          ) : null
        )}
      </ul>

      <h3>{props.name}</h3>

      <ul className={Style.techs} style={{ opacity: hovered ? 100 : 0 }}>
        {props.techs.map((t, i) => (
          <p key={i} className={Style.tech}>
            {t}
          </p>
        ))}
      </ul>
    </div>
  );
}
