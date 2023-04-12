// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function parsePage(input: any, def = 1) {
  const page = parseInt(input, 10);

  if (Number.isNaN(page)) {
    return def;
  }

  return page;
}
