import useCursor from '@/hooks/useCursor';
import classNames from 'classnames';
import { useState } from 'react';

interface Props {
  opened?: boolean;
  className?: string;
  onClick?: (opened: boolean) => void;
}

export default function Menu({ opened, className, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const cursor = useCursor(({ instance }) => instance);
  const lineClassName =
    'block w-6 h-[3px] bg-white transition-all duration-500 ease-expo';

  return (
    <section
      className={classNames(
        'menu h-8 w-10 flex flex-col justify-center gap-[7px] cursor-pointer before:-inset-4 before:block before:absolute z-[1000]',
        className,
      )}
      onClick={() => onClick?.(!opened)}
      onMouseEnter={(ev) => {
        cursor?.setStick(ev.currentTarget);
        setHovered(true);
      }}
      onMouseLeave={() => {
        cursor?.removeStick();
        setHovered(false);
      }}
    >
      <span
        className={classNames(
          lineClassName,
          opened && 'rotate-45 translate-y-[2.5px] translate-x-2',
          hovered && 'bg-zinc-800',
        )}
      />
      <span
        className={classNames(
          lineClassName,
          !opened && 'ml-3',
          opened && '-rotate-45 translate-y-[-8px] translate-x-2',
          hovered && 'bg-zinc-800',
        )}
      />
    </section>
  );
}
