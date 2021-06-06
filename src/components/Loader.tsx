import { ReactElement } from 'react';

import Style from '@styles/loader.module.scss';

interface Props {
  loaded: boolean;
}

export default function Loader({ loaded }: Props): ReactElement {
  return (
    <div className={`${Style.container} ${!loaded ? Style.active : ''}`}>
      <p className={Style.text}>LOADING</p>
      <div className={Style.circle}></div>
      <div className={Style.circle}></div>
      <div className={Style.circle}></div>
    </div>
  );
}
