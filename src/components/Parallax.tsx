import mapRange from '@/lib/mapRange';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useWindowSize } from 'react-use';

interface Props {
  className?: string;
  children: React.ReactNode;
  speed?: number;
  id?: string;
  position?: 'top' | 'bottom';
  offset?: number;
  fade?: boolean;
  fadeOffset?: number;
}

export default function Parallax({
  className,
  children,
  speed = 1,
  id = 'parallax',
  position,
  offset = 0,
  fade = true,
  fadeOffset = 0.8,
}: Props) {
  const trigger = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const { height } = useWindowSize();

  useLayoutEffect(() => {
    const y = height * speed * 0.1;

    const setY = gsap.quickSetter(target.current, 'y', 'px');
    const setOpacity = gsap.quickSetter(target.current, 'opacity');
    const set3D = gsap.quickSetter(target.current, 'force3D');

    let initialPosition: number | null = null;
    const timeline = gsap.timeline({
      scrollTrigger: {
        id,
        trigger: trigger.current,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (e) => {
          if (initialPosition === null) {
            initialPosition = e.progress;
          }

          if (fade) {
            const opacity =
              e.progress <= fadeOffset
                ? 1
                : 1 -
                  ((e.progress - fadeOffset) * 100) / ((1 - fadeOffset) * 100);
            setOpacity(opacity);
          }

          set3D(
            e.progress - initialPosition > 0 &&
              e.progress - initialPosition < 1,
          );

          if (isMobile) return;
          if (position === 'top') {
            setY((e.progress - initialPosition) * y + offset);
          } else {
            setY(-mapRange(0, 1, e.progress - initialPosition, 0, y) + offset);
          }
        },
      },
    });

    return () => {
      timeline.kill();
    };
  }, [id, speed, position, height, fade, fadeOffset, offset]);

  return (
    <div ref={trigger} className={className}>
      <div ref={target}>{children}</div>
    </div>
  );
}
