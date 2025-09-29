export async function getData(url: string) {
  const baseUrl = process.env.DB_HOST;

  const respond = await fetch(`${baseUrl}${url}`);
  const data = await respond.json();

  return data;
}
