export default function retrivApi(path: string) {
  return `${process.env.REACT_APP_API_BASE_URL}/api/${path}`;
}