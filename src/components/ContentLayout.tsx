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
    <section className={classNames('w-full lg:w-2/5 mx-auto', className)}>
      {children}
    </section>
  );
}
