const mapRange = (
  inMin: number,
  inMax: number,
  input: number,
  outMin: number,
  outMax: number,
) => ((input - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export default mapRange;
