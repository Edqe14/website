/* eslint-disable @next/next/no-img-element */
import 'highlight.js/styles/github-dark.css';
import ContentLayout from '@/components/ContentLayout';
import ContentMDX from '@/components/ContentMDX';
import Head from '@/components/Head';
import { ArrowLeft } from '@phosphor-icons/react';
import { allPosts } from 'contentlayer/generated';
import type { Post, Project } from 'contentlayer/generated';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import Footer from '@/components/home/Footer';
import Logo from '@/components/Logo';

export const getStaticPaths = () => {
  // eslint-disable-next-line no-underscore-dangle
  const paths = allPosts.map((p) => p.url);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const post = allPosts.find(
    (p) =>
      // eslint-disable-next-line no-underscore-dangle
      p.url === `/blog/${params?.slug as string}`,
  );

  return {
    props: {
      post,
    },
  };
};

const GoBack = () => (
  <Link
    href="/blog"
    className="flex items-center gap-3 mb-8 text-light-gold font-medium"
  >
    <ArrowLeft size={24} />
    Go back • Blog
  </Link>
);

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow fixed inset-0 opacity-60 overflow-hidden">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 -right-96 lg:right-48 animate-spin-slow absolute bg-gradient-to-b from-[#FF375B] via-[#92E0A8] to-[#4440F0]"
        />

        <span
          id="blob-2"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />
      </section>
    </>
  );
};

export default function Project({ post }: { post: Post }) {
  return (
    <>
      <Head title={`Blog • ${post.title}`} />
      <BlurredBackground />

      <section className="relative pb-0 p-12 w-screen min-h-screen flex flex-col">
        <Link className="absolute hidden lg:block" href="/">
          <Logo />
        </Link>

        <ContentLayout tight>
          <GoBack />

          <section className="mb-12">
            {post.image && (
              <img
                className="mb-8 rounded-md mx-auto aspect-[20/9] object-cover"
                src={post.image}
                alt="Banner"
              />
            )}

            <h2 className="font-semibold text-5xl lg:text-6xl tracking-tight leading-tight lg:leading-tight block mb-4">
              {post.title}
            </h2>

            <p className="text-light-gold mt-2 font-medium">
              {format(parseISO(post.date), 'dd MMMM yyyy hh:mm a')} •{' '}
              {post.readingTime}
            </p>
          </section>

          <section className="text-zinc-100 mb-12 text-lg max-w-full prose prose-sm prose-amber prose-img:rounded-md prose-invert prose-code:[background:none_!important]">
            <ContentMDX code={post.body.code} />

            <hr className="-mx-16" />
          </section>

          <section>
            <GoBack />
          </section>
        </ContentLayout>
      </section>

      <Footer />
    </>
  );
}
