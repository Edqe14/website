import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

import Style from '@styles/input.module.scss';

export default function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
): ReactElement {
  return <input {...props} className={`${Style.input} ${props.className}`} />;
}
