import { useAuth } from "@/context/AuthContext";

export default function GetUserAuthority() {
  const { currentUser } = useAuth();
  return {
    role: currentUser.role,
  };
}
