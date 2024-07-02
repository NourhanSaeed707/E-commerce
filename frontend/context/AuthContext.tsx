// import client from "@/client/client";
// import { LoginUser, UserContext, UserType } from "@/types/users";
// import { useRouter } from "next/router";
// import {
//   ReactNode,
//   useCallback,
//   useMemo,
//   useState,
//   createContext,
//   useContext,
// } from "react";
// import { getCookie, setCookie, removeCookie } from "typescript-cookie";
// import useSWR, { mutate } from "swr";
// import { deleteCookie } from "cookies-next";

// const AuthContext = createContext<UserContext>({
//   login: () => {},
//   logout: () => {},
//   currentUser: null,
//   isSubmitting: false,
//   setCurrentUser: () => {},
// });

// type ProviderProps = {
//   children: ReactNode;
// };

// export default function CurrentUserProvider({ children }: ProviderProps) {
//   const [currentUser, setCurrentUser] = useState<UserType | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const router = useRouter();

//   const { data: user, mutate } = useSWR<UserType>(
//     "/api/v2/auth/user",
//     async () => {
//       // const token = localStorage.getItem(authTokenKey);
//       const token = getCookie("token");
//       if (token && !client.defaults.headers.common.Authorization) {
//         client.defaults.headers.common.Authorization = `Bearer ${token}`;
//       }
//       if (token) {
//         const data = await client
//           .get("/api/v2/auth/user")
//           .then((res) => res.data)
//           .catch((error) => {
//             if (error?.response?.status === 401) {
//               delete client.defaults.headers.common.Authorization;
//               if (currentUser) {
//                 setCurrentUser(null);
//               }
//             }
//           });
//         if (data) {
//           setCurrentUser(data);
//         }
//         return data;
//       }
//       return false;
//     },
//     {
//       dedupingInterval: 3000,
//     }
//   );

//   const login = useCallback(
//     async (values: LoginUser) => {
//       setIsSubmitting(true);
//       await client
//         .post("/api/v2/auth/authenticate", {
//           email: values.email,
//           password: values.password,
//         })
//         .then((res) => {
//           if (res.data && res.data.token) {
//             const date = new Date();
//             client.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
//             setCookie("token", res.data.token, {
//               expires: 300,
//               secure: true,
//               path:"/"
//             });
//             // localStorage.setItem("authTokenKey", res.data.token);
//             mutate().then(() => {
//               router.push("/");
//             });
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//     [mutate, router]
//   );

//   const logout = useCallback(async () => {
//     delete client.defaults.headers.common.Authorization;
//     // localStorage.removeItem("authTokenKey");
//     removeCookie("token");
//     deleteCookie("token");
//     setCurrentUser(null);
//   }, []);

//   const stateValues = useMemo(
//     () => ({
//       currentUser,
//       setCurrentUser,
//       isSubmitting,
//       login,
//       logout,
//     }),
//     [currentUser, setCurrentUser, isSubmitting, login, logout]
//   );

//   return (
//     <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context: UserContext = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within CurrentUserProvider");
//   }
//   return context;
// }
// components/CurrentUserProvider.tsx

import client from "@/client/client";
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

const AuthContext = createContext<UserContext>({
  login: () => {},
  logout: () => {},
  currentUser: null,
  isSubmitting: false,
  setCurrentUser: () => {},
});

type ProviderProps = {
  children: ReactNode;
};

export default function CurrentUserProvider({ children }: ProviderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: user, mutate } = useSWR<UserType>(
    "/api/v2/auth/user",
    async () => {
      console.log("insiiiide get user auth");
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
        console.error(error);
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
      mutate();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [mutate, router]);

  const stateValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isSubmitting,
      login,
      logout,
    }),
    [setCurrentUser, currentUser, isSubmitting, login, logout]
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
