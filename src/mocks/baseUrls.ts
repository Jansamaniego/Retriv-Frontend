export default function retrivApi(path: string) {
  return `${
    process.env.REACT_APP_NODE_ENV === 'development'
      ? process.env.REACT_APP_API_LOCAL_BASE_URL
      : process.env.REACT_APP_API_WEB_BASE_URL
  }/api/${path}`;
}
