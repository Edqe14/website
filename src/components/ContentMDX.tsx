/* eslint-disable @typescript-eslint/indent */
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@phosphor-icons/react';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import classNames from 'classnames';
import Twemoji from './Twemoji';

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

interface Props {
  code: string;
  globals?: Record<string, unknown>;
  components?: Record<string, FC>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const LinkWrap = ({ ...props }: AnchorProps) => (
  <a target="_blank" rel="noreferrer" {...props} />
);

const wrap = (el: JSX.Element, { href, ...props }: AnchorProps) => {
  if (!href) {
    return el;
  }

  return (
    <LinkWrap href={href} {...props}>
      {el}
    </LinkWrap>
  );
};

const componentList = {
  GithubLogo: (props: AnchorProps) =>
    wrap(<FontAwesomeIcon className="text-4xl" icon={faGithub} />, props),
  Link: (props: AnchorProps) => wrap(<Link className="text-4xl" />, props),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Twemoji: ({ className, ...props }: any) => (
    <Twemoji
      inline
      {...props}
      className={classNames('rounded-none', className)}
    />
  ),
};

export default function ContentMDX({
  code,
  globals,
  components,
  ...props
}: Props) {
  const MDXContent = useMDXComponent(code, globals);

  return (
    <MDXContent {...props} components={{ ...componentList, ...components }} />
  );
}
