import client from "@/client/client";
import { useState } from "react";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetOneCategoryType(id: Number) {
  const apiUrl = "/api/category-type/get";
  const [laoding, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  const { data: catgeoryType } = useSWR(apiUrl, async () => {
    setLoading(true);
    const token = getCookie("token");
    const { data } = await client.get(`${apiUrl}/${id}`, {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });
    if (data) {
      setLoading(false);
      setError(false);
    } else {
      setError(true);
    }
    return data;
  });

  return {
    laoding,
    error,
    catgeoryType,
  };
}
