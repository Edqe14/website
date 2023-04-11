import useCursor from '@/hooks/useCursor';
import {
  faDiscord,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight } from '@phosphor-icons/react';

export default function Footer() {
  const cursor = useCursor(({ instance }) => instance);

  return (
    <footer
      data-id="footer"
      className="p-12 w-screen h-[26rem] flex flex-col justify-between"
    >
      <section>
        <h2 className="text-5xl sm:text-7xl font-medium tracking-tight mb-4">
          Wanna talk?
        </h2>

        <section className="flex gap-3 items-center">
          <ArrowRight
            weight="bold"
            className="text-light-gold text-2xl md:text-3xl flex-shrink-0"
          />
          <a href="mailto:hello@edqe.me" className="text-3xl">
            hello@edqe.me
          </a>
        </section>
      </section>

      <section className="flex justify-between gap-4 itmes-end">
        <p className="text-pale-purple">
          &copy; {new Date().getFullYear()} Joshua T. All rights reserved.
        </p>

        <section className="text-3xl flex gap-4 items-center text-zinc-200">
          <a href="https://github.com/edqe14" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>

          <FontAwesomeIcon
            className="cursor-pointer"
            onMouseEnter={() => cursor?.setText('Copy')}
            onMouseLeave={() => cursor?.removeText()}
            onClick={async () => {
              await navigator.clipboard.writeText('Yuka#2686');

              cursor?.setText('Copied!');

              setTimeout(() => {
                cursor?.removeText();
              }, 3000);
            }}
            icon={faDiscord}
          />

          <a
            href="https://www.linkedin.com/in/joshua-t-85a9b6228/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </section>
      </section>
    </footer>
  );
}
