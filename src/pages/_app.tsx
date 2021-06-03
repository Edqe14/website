import '@styles/globals.scss';
import { ReactElement } from 'react';

function Oracle({
  Component,
  pageProps,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}): ReactElement {
  return <Component {...pageProps} />;
}

export default Oracle;
