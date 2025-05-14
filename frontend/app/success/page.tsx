"use client";

import ParentWrapper from "@/bi/ParentWrapper";
import Loader from "@/components/ui/loader";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const { authLoading } = useAuthStatus({
    onSuccess: () => {
      router.push(CLIENT_ROUTES.HOME);
    },
  });

  if (authLoading) {
    return (
      <ParentWrapper>
        <Loader />
      </ParentWrapper>
    );
  }

  return null;
}
