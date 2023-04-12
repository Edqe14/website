import ContentLayout from '@/components/ContentLayout';
import Head from '@/components/Head';
import Logo from '@/components/Logo';
import Footer from '@/components/home/Footer';
import useCursor from '@/hooks/useCursor';
import getPaginatedPosts from '@/lib/getPaginatedPosts';
import parsePage from '@/lib/parsePage';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

const GLOBAL_LIMIT = 10;

const BlurredBackground = () => {
  return (
    <>
      <section className="w-screen h-full z-[-2] flex-grow absolute inset-0 overflow-hidden opacity-70">
        <span
          id="blob-1"
          className="blur-[250px] block rounded-full w-[45rem] h-[40rem] -top-80 md:-top-16 -right-96 md:right-4 animate-spin-slow absolute bg-gradient-to-b from-[#37E7FF] via-[#E0CE92] to-[#F040BF]"
        />

        <span
          id="blob-2"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[105vh] -left-48 md:left-0 animate-spin-slow absolute bg-gradient-to-b from-[#FF375B] via-[#92E0A8] to-[#4440F0]"
        />

        <span
          id="blob-3"
          className="blur-[250px] block rounded-full w-[30rem] h-[35rem] top-[200vh] -right-56 md:right-0 animate-spin-slow absolute bg-gradient-to-b from-[#37FF4B] via-[#92ACE0] to-[#F040C9]"
        />
      </section>
    </>
  );
};

const Body = ({ meta }: ReturnType<typeof getPaginatedPosts>) => {
  const router = useRouter();
  const cursor = useCursor(({ instance }) => instance);
  const [page, setPage] = useState(
    router.query.page ? parsePage(router.query.page, 1) : meta.page,
  );
  const { data } = useSWR<ReturnType<typeof getPaginatedPosts>>(
    `/api/blog/list?page=${page}&limit=${GLOBAL_LIMIT}`,
  );

  return (
    <section className="relative p-12 w-screen min-h-screen flex flex-col">
      <Link className="hidden lg:block absolute" href="/">
        <Logo />
      </Link>

      <ContentLayout className="flex flex-col flex-grow">
        <h2 className="font-semibold text-4xl sm:text-5xl tracking-tight flex gap-4 items-center mb-8">
          <Link href="/">
            <ArrowLeft
              className="text-light-gold text-2xl md:text-3xl flex-shrink-0"
              size={32}
            />
          </Link>
          Blog
        </h2>

        <section className="-mx-5 sm:mx-0 mb-8 flex-grow">
          {data?.data.map((post) => (
            <Link
              className="block"
              // eslint-disable-next-line no-underscore-dangle
              key={post._id}
              // eslint-disable-next-line no-underscore-dangle
              href={post.url}
            >
              <article
                onMouseEnter={() => {
                  cursor?.setText(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#323232" viewBox="0 0 256 256" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#151718;"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path></svg>',
                  );
                }}
                onMouseLeave={() => {
                  cursor?.removeText();
                }}
                onClick={() => {
                  cursor?.removeText();
                }}
                className="group grid grid-cols-2 md:grid-cols-3 items-center relative px-6 sm:px-8 py-6 cursor-pointer after:z-[-1] after:absolute after:h-full after:inset-y-0 after:right-0 after:w-0 hover:after:left-0 after:bg-zinc-100 hover:after:w-full after:transition-all after:duration-200 after:ease-in-out"
              >
                <section>
                  <h2 className="text-3xl font-medium group-hover:text-pale-purple tracking-tight">
                    {post.title}
                  </h2>

                  <p className="text-light-gold block lg:hidden justify-self-center md:justify-self-start font-medium text-lg mt-1">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                  </p>
                </section>

                <p className="text-light-gold hidden md:block opacity-0 lg:opacity-100 justify-self-center xl:justify-self-start font-medium text-xl tracking-tight">
                  {format(parseISO(post.date), 'LLLL d, yyyy')}
                </p>

                <p className="flex gap-3 items-center font-medium text-washed-purple group-hover:text-pale-purple transition-colors duration-200 justify-self-end">
                  <span className="hidden sm:block">{post.readingTime}</span>
                  <ArrowRight size={24} strokeWidth={3} />
                </p>
              </article>
            </Link>
          ))}
        </section>

        <section className="flex items-center justify-center gap-8 opacity-80">
          <p
            className={classNames(
              'flex items-center gap-4 font-medium text-zinc-300',
              page <= 1 && 'text-zinc-500 cursor-not-allowed',
            )}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <ArrowLeft size={18} weight="bold" />
            Prev
          </p>

          <p className="text-sm sm:text-base font-medium whitespace-nowrap">
            Page {page} / {meta.total}
          </p>

          <p
            className={classNames(
              'flex items-center gap-4 font-medium text-zinc-300',
              page >= meta.total && 'text-zinc-500 cursor-not-allowed',
            )}
            onClick={() => {
              if (page < meta.total) {
                setPage(page + 1);
              }
            }}
          >
            Next
            <ArrowRight size={18} weight="bold" />
          </p>
        </section>
      </ContentLayout>
    </section>
  );
};

export default function Blog({
  posts,
}: {
  posts: ReturnType<typeof getPaginatedPosts>;
}) {
  return (
    <>
      <Head title="Blog" />
      <BlurredBackground />

      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher: (url: string) => fetch(url).then((r) => r.json()),
          fallback: {
            [`/api/blog/list?page=${posts.meta.page}&limit=${GLOBAL_LIMIT}`]:
              posts,
          },
        }}
      >
        <Body {...posts} />
      </SWRConfig>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPaginatedPosts(1, GLOBAL_LIMIT);

  return {
    props: {
      posts,
    },
  };
};
