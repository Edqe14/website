interface Props {
  page?: number;
  text?: string;
}

export default function PageMarker({ page = 1, text = 'HI' }: Props) {
  return (
    <p className="tracking-[0.5rem] mix-blend-exclusion text-pale-purple absolute bottom-0 left-0">
      {page}•<span className="tracking-normal">{text}</span>
    </p>
  );
}
