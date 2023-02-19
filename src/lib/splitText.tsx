import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Options {
  separator?: string;
  className?: string;
  props?: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

export default function splitText(
  text: string,
  { separator = '', className, props = {} }: Options = {},
) {
  return text.split(separator).map((char, i) => (
    <span key={i} className={classNames('inline-block', className)} {...props}>
      {char}
    </span>
  ));
}
