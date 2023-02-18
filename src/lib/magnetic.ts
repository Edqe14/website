/*!
 * Cuberto Magnetic
 *
 * @version 1.5.0
 * @author Cuberto (cuberto.com)
 * @licence Copyright (c) 2020, Cuberto. All rights reserved.
 */

import gsap from 'gsap';

interface Options {
  x: number;
  y: number;
  s: number;
  rs: number;
}

function getOffset(element: HTMLElement) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;
  return {
    top: rect.top + (win?.pageYOffset ?? 0),
    left: rect.left + (win?.pageXOffset ?? 0),
  };
}

export default class Magnetic {
  el: HTMLElement;

  x: number;

  y: number;

  width: number;

  height: number;

  options: Options;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unbind: () => void = () => {};

  constructor(
    el: HTMLElement,
    options: Options = { x: 0.2, y: 0.2, s: 0.2, rs: 0.7 },
  ) {
    this.el = el;

    this.y = 0;
    this.x = 0;
    this.width = 0;
    this.height = 0;
    this.options = options;
    this.unbind = this.bind();
  }

  bind() {
    const mouseenter = () => {
      this.y = getOffset(this.el).top - window.pageYOffset;
      this.x = getOffset(this.el).left - window.pageXOffset;
      this.width = this.el.clientWidth;
      this.height = this.el.clientHeight;
    };

    const mousemove = (e: MouseEvent) => {
      const y = (e.clientY - this.y - this.height / 2) * this.options.y;
      const x = (e.clientX - this.x - this.width / 2) * this.options.x;
      this.move(x, y, this.options.s);
    };

    const mouseleave = () => {
      this.move(0, 0, this.options.rs);
    };

    this.el.addEventListener('mouseenter', mouseenter);
    this.el.addEventListener('mousemove', mousemove);
    this.el.addEventListener('mouseleave', mouseleave);

    return () => {
      this.el.removeEventListener('mouseenter', mouseenter);
      this.el.removeEventListener('mousemove', mousemove);
      this.el.removeEventListener('mouseleave', mouseleave);
    };
  }

  move(x: number, y: number, speed: number) {
    gsap.to(this.el, {
      y,
      x,
      overwrite: true,
      duration: speed,
    });
  }
}

export { Magnetic };
