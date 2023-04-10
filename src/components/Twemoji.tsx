/* eslint-disable @next/next/no-img-element */
import { HTMLAttributes, ReactElement, ReactNode, useMemo } from 'react';
import renderEmoji from 'react-easy-emoji';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  inline?: boolean;
}

export function Emoji({
  code,
  emoji,
  ...props
}: { code: string; emoji?: string } & HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      src={`https://twemoji.maxcdn.com/2/svg/${code}.svg`}
      alt={emoji}
      className="h-[1em] inline-block my-0 mx-[.2em] align-[-0.1em]"
    />
  );
}

export default function Twemoji({ children, inline = false, ...props }: Props) {
  const rendered = useMemo(
    () =>
      renderEmoji(children, (code, emoji, key) => (
        <Emoji code={code} emoji={emoji} key={key} />
      )) as unknown as (ReactElement | string)[],
    [children],
  );

  const map = rendered.map((value, i) =>
    typeof value === 'string' ? (
      <span key={i} className="break-words whitespace-pre-line">
        {value}
      </span>
    ) : (
      value
    ),
  );

  if (inline) return <>{map}</>;

  return <p {...props}>{map}</p>;
}
