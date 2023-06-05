import classNames from 'classnames';
import { ReactNode } from 'react';

export default function ContentLayout({
  children,
  className,
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section
      className={classNames(
        'w-full mx-auto',
        tight && 'lg:w-3/5 2xl:w-2/5',
        !tight && 'lg:w-3/4 2xl:w-3/5',
        className,
      )}
    >
      {children}
    </section>
  );
}
