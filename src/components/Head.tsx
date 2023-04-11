import NextHead from 'next/head';

interface Props {
  title?: string;
}

export default function Head({ title = 'Home' }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="edqe,edqe_,landing page" />
      <meta name="copyright" content="Edqe_" />
      <meta name="subject" content="Edqe_ Landing Page" />
      <meta name="og:title" content="Welcome!" />
      <meta name="og:url" content="https://edqe.me" />
      <meta name="description" content="A very epic site" />
      <meta name="og:site_name" content="Edqe_" />
      <meta name="og:description" content="A very epic site" />
      <meta name="og:image" content="/favicon.ico" />
      <meta name="theme-color" content="#1D191F" />
    </NextHead>
  );
}
