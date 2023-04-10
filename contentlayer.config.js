import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
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
  },
  computedFields: {
    url: {
      type: 'string',
      // eslint-disable-next-line no-underscore-dangle
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
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
});
