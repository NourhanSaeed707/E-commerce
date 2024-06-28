export default async function FetchToken() {
  const response = await fetch("/api/get-token");
  const data = await response.json();
  return data;
}
