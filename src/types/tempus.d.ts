declare module '@studio-freight/tempus' {
  type RafCallback = (time: number, deltaTime: number) => void;
  class Raf {
    add: (callback: RafCallback, priority = 0) => () => void;

    remove: (callback: RafCallback) => void;
  }

  // eslint-disable-next-line import/prefer-default-export
  export const raf: Raf;
}
