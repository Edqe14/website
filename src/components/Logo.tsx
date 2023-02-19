import classNames from 'classnames';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 48, height = 48, className }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      className={classNames('w-[35px] sm:w-[48px] aspect-square', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_7)">
        <path
          d="M24.1103 24.0375H44.3413C44.3413 19.1723 42.5915 14.4692 39.411 10.7861C36.1429 7.0015 30.813 3.71429 24.1103 3.71429H3.71244L3.71244 23.9965C3.71244 23.9965 3.52622 27.8333 5.50422 32.2787C7.48223 36.7242 10.9932 40.3109 15.3968 42.3847C19.8004 44.4586 24.8031 44.8813 29.4926 43.5759C34.1821 42.2705 38.2458 39.3239 40.9426 35.2735H44.3425V48"
          stroke="#FEFEFE"
          strokeWidth="7.31429"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_7">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
