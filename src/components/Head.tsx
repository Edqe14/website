import NextHead from 'next/head';

interface Props {
  title?: string;
}

export default function Head({ title = 'Home' }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  );
}
