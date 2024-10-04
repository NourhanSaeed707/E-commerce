import client from "@/client/client";
import useSWR from "swr";

export default function useGetAllImages(
  apiUrl: string,
  productId: number,
  colorId: number
) {
  const fetcher = (apiUrl: string) => client.get(apiUrl).then((res) => res.data);

  const { data, error, isLoading} = useSWR(`${apiUrl}/${productId}/${colorId}`, fetcher, {
    dedupingInterval: 1000,
  });
  return {
    images: !isLoading && data ? data : [],
    error,
    isLoading,
  };
}
