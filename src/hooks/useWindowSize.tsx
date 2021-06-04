export default function useWindowSize(): {
  width: number;
  height: number;
} {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
