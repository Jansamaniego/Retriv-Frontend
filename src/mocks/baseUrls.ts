export default function retrivApi(path: string) {
  return `${
    process.env.REACT_APP_NODE_ENV === 'development'
      ? process.env.REACT_APP_API_BASE_URL
      : process.env.RENDER_EXTERNAL_HOSTNAME
  }/api/${path}`;
}
