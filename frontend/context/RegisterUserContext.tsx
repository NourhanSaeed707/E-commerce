import { UserRegisterStoreContext, UserType } from "@/types/users";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const RegisterUserContext = createContext<UserRegisterStoreContext>({
  storeUser: () => {},
  setUserRegisterVal: () => {},
  userRegisterVal: null,
});

type ProviderProps = {
  children: ReactNode;
};

export default function RegisterUserProvider({ children }: ProviderProps) {
  const [userRegisterVal, setUserRegisterVal] = useState<UserType | null>(null);

  const storeUser = useCallback(
    async (userValue: UserType) => {
      setUserRegisterVal(userValue);
    },
    [setUserRegisterVal]
  );

  const stateValues = useMemo(
    () => ({
      storeUser,
      setUserRegisterVal,
      userRegisterVal,
    }),
    [storeUser, setUserRegisterVal, userRegisterVal]
  );

  return (
    <RegisterUserContext.Provider value={stateValues}>
      {children}
    </RegisterUserContext.Provider>
  );
}

export function useUserRegisterStore() {
  const context: UserRegisterStoreContext = useContext(RegisterUserContext);
  if (!context) {
    throw new Error("useAuth must be used within CurrentUserProvider");
  }
  return context;
}
