import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export default function getPaginatedPosts(page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(startIndex, endIndex)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ body, _raw, ...rest }) => rest);

  return {
    data,
    meta: {
      page,
      total: Math.ceil(allPosts.length / limit),
    },
  };
}
