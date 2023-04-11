import classNames from 'classnames';
import { ReactNode } from 'react';

export default function ContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={classNames('lg:w-1/2 mx-auto', className)}>
      {children}
    </section>
  );
}
