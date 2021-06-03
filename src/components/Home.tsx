import React, { createRef, ReactElement } from 'react';

// @ts-expect-error SVG
import Scroll from '@/public/assets/scroll.svg';

import Style from '@styles/home.module.scss';

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
let index = 0;

interface Props {
  texts: string[];
}

export default function Home({ texts }: Props): ReactElement {
  const greeting = createRef();
  const changeText = async () => {
    if (!greeting.current) return;
    const h1 = greeting.current as HTMLHeadingElement;
    h1.style.opacity = '0';

    await sleep();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    index++;
    if (index > texts.length - 1) index = 0;

    h1.innerHTML = texts[index];
    h1.style.opacity = '1';
    await sleep();

    setTimeout(changeText, 3000);
  };
  setTimeout(changeText, 3000);

  return (
    <section className={Style.container} id='home'>
      <div className={Style.content}>
        <h1 ref={greeting as React.RefObject<HTMLHeadingElement>}>Hi There</h1>
        <Scroll className={Style.scroll} />
      </div>

      <video autoPlay muted loop preload='auto' className={Style.bg}>
        <source src='/assets/bg.webm' type='video/webm' />
        Your browser does not support video tag.
      </video>
    </section>
  );
}
