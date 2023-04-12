import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight';

export const calculateReadingTime = (text) => {
  // Step 2: Determine the average reading speed (words per minute)
  const wordsPerMinute = 200;
  // Step 3: Calculate the word count
  const noOfWords = text.split(/\s/g).length;
  // Step 4: Calculate the estimated reading time (in minutes)
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  // Step 5: Format the output
  return `${minutes < 1 ? '<' : ''}${readTime} min read`;
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    image: {
      type: 'string',
      description: 'The image of the post',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      // eslint-disable-next-line no-underscore-dangle
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'string',
      // eslint-disable-next-line no-underscore-dangle
      resolve: (post) => calculateReadingTime(post.body.raw),
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the project',
      required: true,
    },
    year: {
      type: 'number',
      description: 'The year the project was created',
    },
    url: {
      type: 'string',
      description: 'The URL to the project',
    },
  },
}));

export default makeSource({
  contentDirPath: './contents',
  documentTypes: [Post, Project],
  mdx: {
    rehypePlugins: [highlight],
  },
});
