import { useRouter } from "next/navigation";

export const useCheckAuth = async () => {
  const router = useRouter();
  const res = await fetch("/api/get-user");
  if (res.status === 401) {
    router.push("/");
    return null;
  }
  return res.json();
};
