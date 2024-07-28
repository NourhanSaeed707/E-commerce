export default async function FetchToken() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${baseUrl}/api/get-token`);
  console.log("resss get token: ", response);
  const data = await response.json();
  return data;
}
