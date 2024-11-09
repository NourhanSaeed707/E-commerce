import { LoginUser, UserContext, UserType } from "@/types/users";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext<UserContext>({
  login: () => {},
  logout: () => {},
  currentUser: null,
  isSubmitting: false,
  setCurrentUser: () => {},
  setEmail: () => {},
  email: null,
});

type ProviderProps = {
  children: ReactNode;
};

export default function CurrentUserProvider({ children }: ProviderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const { data: user, mutate } = useSWR<UserType>(
    "/api/v2/auth/user",
    async () => {
      const response = await axios.get("/api/get-user");
      const data = response.data;

      if (data) {
        setCurrentUser(data);
      }

      return data || false;
    },
    {
      dedupingInterval: 1000,
    }
  );

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && router.pathname === "/login") {
      router.push("/");
    }
  }, [currentUser, router]);

  const login = useCallback(
    async (values: LoginUser) => {
      setIsSubmitting(true);
      try {
        const res = await axios.post("/api/login", {
          email: values.email,
          password: values.password,
        });

        if (res.status === 200) {
          mutate().then(() => {
            router.push("/");
          });
        }
      } catch (error) {
        if (error.response.status == 429) {
          router.push("/forget-password");
        }
        toast.error(`${error.response.data.message}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate, router]
  );

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/logout");
      setCurrentUser(null);
      localStorage.removeItem(`cart_${currentUser?.id}`);
      mutate();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, mutate, router]);

  const stateValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isSubmitting,
      login,
      logout,
      setEmail,
      email,
    }),
    [setCurrentUser, currentUser, isSubmitting, login, logout, setEmail, email]
  );

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within CurrentUserProvider");
  }
  return context;
}
