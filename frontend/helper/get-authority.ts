import { useAuth } from "@/context/auth-context";

export default function GetUserAuthority() {
  const { currentUser } = useAuth();
  return {
    role: currentUser.role,
  };
}
