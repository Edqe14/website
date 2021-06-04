import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';

import Style from '@styles/roundedButton.module.scss';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export default function RoundedButton(props: Props): ReactElement {
  return (
    <button {...props} className={`${Style.button} ${props.className}`}>
      {props.text}
    </button>
  );
}
