import { userType } from "@/auth";
import { useSession } from "next-auth/react";

const useClientSession = () => {
  const { data: session, status } = useSession();
  const user = session?.user as userType;
  return { user, status };
};

export default useClientSession;
