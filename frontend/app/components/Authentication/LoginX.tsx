"use client";

import { getRequest } from "@/api/getRequest";
import { Button } from "@/components/ui/button";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import xBlack from "@/public/xBlack.svg";
import xWhite from "@/public/xWhite.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function LoginX() {
  const {
    data: redirectUrl,
    error: xError,
    isLoading: xLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.LOGIN_WITH_X],
    queryFn: () => getRequest(API_ROUTES.LOGIN_WITH_X),
  });

  const handleLogin = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <Button variant="outline" size="md" onClick={handleLogin}>
      Login with
      <Image
        src={xBlack}
        width={15}
        height={15}
        alt="login with x"
        className="dark:hidden"
        quality={100}
      />
      <Image
        src={xWhite}
        width={15}
        height={15}
        alt="login with x"
        className="hidden dark:block"
        quality={100}
      />
    </Button>
  );
}
