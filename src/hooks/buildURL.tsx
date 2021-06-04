const buildURL = (endpoint?: string): string => {
  return `${location.protocol}//${location.host}${endpoint}`;
};

export default buildURL;
