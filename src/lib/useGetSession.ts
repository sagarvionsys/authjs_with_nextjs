import { auth } from "@/auth";
import { cache } from "react";

const useGetSession = cache(async () => {
  const session = await auth();
  return session;
});

export default useGetSession;
