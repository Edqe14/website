import Style from '@styles/aboutSelf.module.scss';
import { ReactElement } from 'react';

import RoundedButton from '@components/RoundedButton';
// @ts-expect-error SVG
import Globe from '@/public/assets/globe.svg';

interface Props {
  text: string;
}

export default function AboutSelf({ text }: Props): ReactElement {
  return (
    <section className={Style.container} id='about'>
      <div className={Style.section}>
        <div>
          <div className={Style.header}>
            <h4>About —</h4>
            <p>My Self</p>
          </div>

          <p
            dangerouslySetInnerHTML={{ __html: text }}
            className={Style.content}
          />
        </div>

        <div className={Style.contactButton}>
          <RoundedButton
            text='Contact Me'
            onClick={() => {
              const a = document.createElement('a');
              a.href = '#contact';
              a.click();
            }}
          />
        </div>
      </div>
      <div className={Style.section}>
        <Globe />
      </div>
    </section>
  );
}
