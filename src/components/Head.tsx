import NextHead from 'next/head';
import { ReactElement } from 'react';

export default function Head(): ReactElement {
  return (
    <NextHead>
      <title>Edqe_</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='keywords' content='edqe,edqe_,landing page' />
      <meta name='copyright' content='Edqe_' />
      <meta name='subject' content='Edqe_ Landing Page' />
      <meta name='og:title' content='Welcome!' />
      <meta name='og:url' content='https://edqe.me' />
      <meta name='description' content='This is Edqe_ personal website' />
      <meta name='og:site_name' content='Edqe_' />
      <meta
        name='og:description'
        content='My latest website, anyone is welcomed!'
      />
      <meta name='og:image' content='/assets/logo.jpg' />
      <meta name='theme-color' content='#07060F' />

      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      ></link>
    </NextHead>
  );
}
